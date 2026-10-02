import { useEffect } from 'react';

export default function useDocumentTitle(title, description) {
  useEffect(() => {
    const baseTitle = 'Lost & Founds App - Pelaporan Barang Hilang & Temuan';
    if (title) {
      document.title = title;
    } else {
      document.title = baseTitle;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);
}
