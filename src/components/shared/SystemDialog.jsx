// src/components/shared/SystemDialog.jsx
// 全局系统对话框 — 挂载 window.showSystemDialog
// 供所有页面复用（桌面、课程、论坛、日志……）

import { useEffect, useState } from 'react';

let dialogResolver = null;

const SystemDialogContainer = () => {
    const [dialog, setDialog] = useState(null);

    useEffect(() => {
        window.showSystemDialog = (type, title, message) => {
            return new Promise((resolve) => {
                dialogResolver = resolve;
                setDialog({ type, title, message });
            });
        };
        return () => {
            delete window.showSystemDialog;
        };
    }, []);

    if (!dialog) return null;

    const iconMap = {
        error: '❌',
        warn: '⚠️',
        info: 'ℹ️',
    };

    const close = (result) => {
        setDialog(null);
        if (dialogResolver) dialogResolver(result);
    };

    return (
        <div className="modal-overlay" onClick={() => close('dismiss')} style={{ zIndex: 99999 }}>
            <div className="dialog" onClick={e => e.stopPropagation()}>
                <div className="win-titlebar">
                    <span className="title-text">
                        {dialog.type === 'error' ? '❌ 错误' : dialog.type === 'warn' ? '⚠️ 警告' : 'ℹ️ 信息'}
                    </span>
                    <span
                        className="title-btn"
                        onClick={() => close('close')}
                    >✕</span>
                </div>
                <div className="dialog-content">
                    <div style={{ fontSize: '28px' }}>{iconMap[dialog.type] || 'ℹ️'}</div>
                    <pre style={{
                        margin: 0,
                        fontFamily: '"SimSun", "宋体", Tahoma, sans-serif',
                        fontSize: '12px',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.6,
                        color: '#000',
                    }}>
                        {dialog.message}
                    </pre>
                </div>
                <div className="dialog-buttons">
                    <button onClick={() => close('ok')}>确定</button>
                </div>
            </div>
        </div>
    );
};

export default SystemDialogContainer;
