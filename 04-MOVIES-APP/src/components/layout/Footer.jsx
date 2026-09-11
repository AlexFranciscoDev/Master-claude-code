import { useRef } from 'react';
import { useLibrary } from '../../hooks/useLibrary';
import { useToast } from '../../hooks/useToast';
import { isValidLibraryShape } from '../../utils/validators';
import './Footer.css';

export function Footer() {
  const { state, importState } = useLibrary();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mis_datos.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Library exported to mis_datos.json', 'success');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!isValidLibraryShape(parsed)) {
          showToast('That file does not match the expected library format.', 'error');
          return;
        }
        importState(parsed);
        showToast('Library imported successfully.', 'success');
      } catch {
        showToast('Could not read that file as valid JSON.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__sync">
          Local JSON Vault in Sync — your watch logs and ratings are saved locally to{' '}
          <code>data/mis_datos.json</code>
        </p>
        <div className="footer__actions">
          <button type="button" className="btn btn-secondary" onClick={handleExport}>
            Export JSON
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleImportClick}>
            Import Backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="visually-hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </footer>
  );
}
