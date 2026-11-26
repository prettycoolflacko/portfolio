import { BrowserRouter } from 'react-router-dom';
import WindowsDesktopShell from '../shell/WindowsDesktopShell';

export default function OsShellApp() {
  return (
    <BrowserRouter basename="/os">
      <WindowsDesktopShell />
    </BrowserRouter>
  );
}
