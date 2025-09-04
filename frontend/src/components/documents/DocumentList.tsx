import React, { useState } from 'react';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Table from '../common/Table';
import Button from '../common/Button';
import Modal from '../common/Modal';
import DocumentViewer from './DocumentViewer';

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  url: string;
}

interface DocumentListProps {
  documents: Document[];
  onDownload: (document: Document) => void;
  onDelete: (document: Document) => void;
  loading?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDownload,
  onDelete,
  loading = false,
}) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const columns = [
    {
      id: 'name',
      label: 'Document Name',
      minWidth: 200,
      format: (value: string, row: Document) => (
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-gray-500" />
          <span>{value}</span>
        </div>
      ),
    },
    { id: 'category', label: 'Category', minWidth: 120 },
    { id: 'uploadedBy', label: 'Uploaded By', minWidth: 150 },
    {
      id: 'uploadedAt',
      label: 'Upload Date',
      minWidth: 120,
      format: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      format: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'approved'
              ? 'bg-green-100 text-green-800'
              : value === 'rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 120,
      align: 'right' as const,
      format: (_: any, row: Document) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outlined"
            size="small"
            icon={<Eye size={16} />}
            onClick={() => {
              setSelectedDocument(row);
              setViewerOpen(true);
            }}
          >
            View
          </Button>
          <Button
            variant="outlined"
            size="small"
            icon={<Download size={16} />}
            onClick={() => onDownload(row)}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            icon={<Trash2 size={16} />}
            onClick={() => {
              setSelectedDocument(row);
              setDeleteModalOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Table
          columns={columns}
          rows={documents}
          loading={loading}
          emptyMessage="No documents found"
        />
      </Card>

      {selectedDocument && (
        <>
          <Modal
            open={viewerOpen}
            onClose={() => setViewerOpen(false)}
            title={selectedDocument.name}
            maxWidth="lg"
          >
            <DocumentViewer document={selectedDocument} />
          </Modal>

          <Modal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Document"
            primaryButtonText="Delete"
            secondaryButtonText="Cancel"
            onPrimaryAction={() => {
              onDelete(selectedDocument);
              setDeleteModalOpen(false);
            }}
          >
            <Typography>
              Are you sure you want to delete "{selectedDocument.name}"? This
              action cannot be undone.
            </Typography>
          </Modal>
        </>
      )}
    </>
  );
};

export default DocumentList;
