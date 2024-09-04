import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const socketRef = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    if (terminalRef.current != null) {
      const term = new Terminal({
        cursorBlink: true,
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: 14,
        theme: {
          background: '#0C0C0C',
          foreground: '#00FF00',
          cursor: '#FFFFFF',
        },
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      termRef.current = term;

      const socket = io('http://localhost:8000');
      socketRef.current = socket;

      socket.on('connect', () => {
        term.write('Connected to server\r\n');
      });

      socket.on('output', (data: string) => {
        term.write(data);
      });

      term.onData((data) => {
        if (socketRef.current) {
          socketRef.current.emit('input', data);
        }
        console.log("data:::", data);
        
        if (data === '\u0008') { // Backspace
          term.write('\b \b'); // Xóa ký tự trước con trỏ
        } else if (data === '\u007F') { // Delete key
            console.log('delete key');
            
          term.write('\x1b[3~'); // Xóa ký tự sau con trỏ
        } else {
          term.write(data); // Hiển thị các ký tự khác
        }
      });

      const handleResize = () => {
        fitAddon.fit();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
        term.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default TerminalComponent;
