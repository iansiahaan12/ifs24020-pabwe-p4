import { useEffect } from 'react';

export default function useDocumentTitle(title, description) {
  useEffect(() => {
    const baseTitle = 'Lost & Founds App';
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      document.title = `${baseTitle} - Pelaporan Barang Hilang & Temuan`;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);
}
