import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import './Terminal.css';

const TerminalComponent = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const socketRef = useRef<SocketIOClient.Socket | null>(null);
  const commandBuffer = useRef<string>('');
  const prompt = '\b \x1b[32mUSER@HOST MINGW64 /d/code/visualize-project/visualize-backend \x1b[0m';
  useEffect(() => {
    if (terminalRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: 14,
        theme: {
          background: '#282a36', // Dark Git Bash background
          foreground: '#ffffff', // Light text color
          cursor: '#ffffff', // White cursor like Git Bash
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
        term.writeln(prompt); // Green prompt with hostname and path
        term.write("\b $ ")
      });

      socket.on('output', (data: string) => {
        console.log("output:::", data)
        const temps = data.split('\n');
        temps.forEach((temp) => {
          term.writeln('\b ' + temp);

        })
        term.writeln(prompt);
        term.write("\b $ ")
      });

      

      term.onData((data) => {
        if (data === '\r') { // Enter key
          if (socketRef.current) {
            socketRef.current.emit('input', commandBuffer.current + '\r');
          }
          commandBuffer.current = '';
          term.write('\r\n');
        } else if (data === '\u0008') { 
          if (commandBuffer.current.length > 0) {
            commandBuffer.current = commandBuffer.current.slice(0, -1);
            term.write('\b \b'); 
          }
        } else if (data === '\u007F') { 
          if (commandBuffer.current.length > 0) {
            commandBuffer.current = commandBuffer.current.slice(0, -1);
            term.write('\b \b');
          }
        } else {
          commandBuffer.current += data;
          term.write(data);
        }
      });

      const handleResize = () => {
        if (termRef.current) {
          fitAddon.fit();
        }
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

  return <div id='terminal' ref={terminalRef} />;
};

export default TerminalComponent;