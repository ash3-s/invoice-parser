"use client";

interface ResponseDisplayProps {
    data: string;
}

export default function ResponseDisplay({ data }: ResponseDisplayProps) {
    if (!data) return null;

    return (
        <div className="glass-panel animate-fade-in mt-6" style={{ padding: '1.5rem', overflow: 'hidden' }}>
            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    <span style={{ width: '6px', height: '20px', backgroundColor: 'var(--accent)', borderRadius: '99px', display: 'block' }}></span>
                    Parsed Result
                </h2>
                <button
                    onClick={() => navigator.clipboard.writeText(data)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '0.5rem'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                    Copy
                </button>
            </div>
            <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: '#e2e8f0',
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
                maxHeight: '500px',
                overflowY: 'auto',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                {data}
            </div>
        </div>
    );
}
