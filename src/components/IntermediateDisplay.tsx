"use client";

interface IntermediateDisplayProps {
    data: any;
    onProceed: () => void;
    isLoading: boolean;
}

export default function IntermediateDisplay({ data, onProceed, isLoading }: IntermediateDisplayProps) {
    if (!data) return null;

    return (
        <div className="glass-panel animate-fade-in mt-6" style={{ padding: '1.5rem', overflow: 'hidden', position: 'relative' }}>

            {/* Loading Overlay */}
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(11, 15, 25, 0.7)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '1.5rem'
                }}>
                    <div className="blobs-container">
                        <div className="blob-spinner"></div>
                    </div>
                    <p style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--foreground)' }}>Processing Verification...</p>
                </div>
            )}

            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    <span style={{ width: '6px', height: '20px', backgroundColor: 'var(--primary)', borderRadius: '99px', display: 'block' }}></span>
                    Intermediate Result
                </h2>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Verify Data
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#e2e8f0',
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
                maxHeight: '500px',
                overflowY: 'auto',
                border: '1px solid rgba(255,255,255,0.05)',
                marginBottom: '1.5rem'
            }}>
                {(() => {
                    const items = Array.isArray(data) ? data : [data];
                    if (items.length === 0) return <p className="text-gray-400 text-center">No data found</p>;

                    const headers = Object.keys(items[0]);

                    return (
                        <div className="table-container">
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr>
                                        {headers.map((header) => (
                                            <th key={header} style={{
                                                textAlign: 'left',
                                                padding: '0.75rem',
                                                borderBottom: '1px solid var(--border)',
                                                color: 'var(--primary)',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                            {headers.map((header) => (
                                                <td key={`${index}-${header}`} style={{
                                                    padding: '0.75rem',
                                                    color: '#e2e8f0',
                                                    verticalAlign: 'top'
                                                }}>
                                                    {String(item[header])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })()}
            </div>

            <div className="flex-center">
                <button
                    onClick={onProceed}
                    disabled={isLoading}
                    style={{
                        padding: '0.75rem 2rem',
                        backgroundColor: 'var(--primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.75rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                    onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                >
                    Proceed with Verification
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
            <style jsx>{`
                .blob-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: var(--primary);
                    animation: spin 1s ease-in-out infinite;
                }
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2); 
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2); 
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3); 
                }
            `}</style>
        </div>
    );
}
