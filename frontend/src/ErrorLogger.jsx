import { useState, useEffect } from 'react';

const ErrorLogger = () => {
  const [logs, setLogs] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedLogs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      setLogs(storedLogs);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 9999,
          background: 'red',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        Show Logs ({logs.length})
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.9)',
        color: 'white',
        zIndex: 9999,
        padding: '20px',
        overflow: 'auto',
      }}
    >
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'white',
          color: 'black',
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        Close
      </button>
      <button
        onClick={() => {
          localStorage.removeItem('error_logs');
          setLogs([]);
        }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '80px',
          background: 'white',
          color: 'black',
          padding: '5px 10px',
          borderRadius: '5px',
        }}
      >
        Clear Logs
      </button>
      <h2>Error Logs ({logs.length})</h2>
      {logs.map((log, index) => (
        <div
          key={index}
          style={{
            marginBottom: '20px',
            borderBottom: '1px solid #333',
            paddingBottom: '10px',
          }}
        >
          <p>
            <strong>Time:</strong> {log.time}
          </p>
          <p>
            <strong>Message:</strong> {log.message}
          </p>
          {log.source && (
            <p>
              <strong>Source:</strong> {log.source}
            </p>
          )}
          {log.lineno && (
            <p>
              <strong>Line:</strong> {log.lineno}
            </p>
          )}
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              maxHeight: '200px',
              overflow: 'auto',
            }}
          >
            {log.stack}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default ErrorLogger;
