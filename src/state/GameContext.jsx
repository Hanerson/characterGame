// src/state/GameContext.jsx
// 站点访问状态 — 对玩家完全隐形
//
// ARG 原则：游戏世界内部不承认玩家的存在。
// 本模块只记录玩家"访问过哪些页面"，用于世界内部的访问控制
// （例如：某些档案需要先在别处找到入口才能打开）。
// 玩家看到的所有提示都是世界内的语言（"权限不足""记录未开放"），
// 绝无"线索""进度""发现"等游戏化表述。

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const STORAGE_KEY = 'zhicheng_site_visit_v2';

// ============================================================
// 访问控制定义（世界内部视角）
// ============================================================
// 每个条目描述"打开某内容需要先访问过哪些页面"。
// 这些是站点/系统的自然访问规则，不是游戏关卡。
export const ACCESS_RULES = {
    // 医疗档案：需要先在系统诊断控制台找到恢复记录
    docMRI: { pages: ['/system/logs'], label: '该档案需要先在诊断控制台中确认其恢复记录。' },
    docFunding: { pages: ['/system/logs'], label: '该档案需要先在诊断控制台中确认其恢复记录。' },
    // 1992年论文：需要先读过两份医疗档案
    doc1992: { pages: ['/archives/1995-mri-records', '/archives/1995-funding-rejection'], label: '该档案需要先阅读相关医疗记录。' },
    // BBS 终末时段：需要先访问系统日志（世界内表现为"该时段记录尚未开放"）
    bbsGlitch: { pages: ['/system/logs'], label: '该时段的记录尚未对外开放。' },
    // 管理面板的完整实验记录：需要访问过主要站点区域
    adminTruth: { pages: ['/course', '/dep', '/archives', '/system/logs'], label: '访问权限不足：该面板需要更完整的访问历史。' },
};

const GameContext = createContext(null);

export const useGame = () => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error('useGame must be used within GameProvider');
    return ctx;
};

const loadState = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { visited: [] };
        const parsed = JSON.parse(raw);
        return { visited: Array.isArray(parsed.visited) ? parsed.visited : [] };
    } catch {
        return { visited: [] };
    }
};

export const GameProvider = ({ children }) => {
    const [visited, setVisited] = useState(loadState().visited);

    // 持久化
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ visited }));
        } catch { /* 忽略存储失败 */ }
    }, [visited]);

    const visitedSet = useMemo(() => new Set(visited), [visited]);

    // 记录一次页面访问（幂等）
    const markVisited = useCallback((path) => {
        setVisited(prev => {
            if (prev.includes(path)) return prev;
            return [...prev, path];
        });
    }, []);

    const hasVisited = useCallback((path) => visitedSet.has(path), [visitedSet]);

    // 访问控制检查
    const checkGate = useCallback((ruleName) => {
        const rule = ACCESS_RULES[ruleName];
        if (!rule) return true;
        return rule.pages.every(p => visitedSet.has(p));
    }, [visitedSet]);

    const resetProgress = useCallback(() => {
        setVisited([]);
    }, []);

    const value = useMemo(() => ({
        visited,
        visitedSet,
        markVisited,
        hasVisited,
        checkGate,
        resetProgress,
    }), [visited, visitedSet, markVisited, hasVisited, checkGate, resetProgress]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
