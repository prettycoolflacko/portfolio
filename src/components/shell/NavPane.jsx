import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VistaIcon from '../VistaIcon';
import { navTree } from '../../data/navigation';

export default function NavPane({ isCollapsed = false, onToggleCollapse }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Track expanded state for tree nodes
  const [expandedNodes, setExpandedNodes] = useState({
    favorites: true,
    libraries: true,
    computer: true,
    'c-drive': true,
    'users-folder': true,
    'elyuzar-user': true,
    network: true,
  });

  const toggleNode = (nodeId, e) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleItemClick = (item) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (item.isDownload) {
      const link = document.createElement('a');
      link.href = item.path;
      link.download = 'Elyuzar_CV.pdf';
      link.click();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const renderTreeItem = (item, depth = 0) => {
    const isBranch = Boolean(item.items && item.items.length > 0);
    const isExpanded = Boolean(expandedNodes[item.id]);
    const isActive = item.path === location.pathname;

    return (
      <div key={item.id} className="win7-tree-node" style={{ userSelect: 'none' }}>
        <div
          onClick={() => {
            if (isBranch) {
              setExpandedNodes((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
            }
            if (item.path || item.externalUrl || item.isDownload) {
              handleItemClick(item);
            }
          }}
          className={`win7-tree-row${isActive ? ' active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 6px',
            paddingLeft: `${depth * 14 + 6}px`,
            borderRadius: 2,
            cursor: 'pointer',
            fontSize: '11.5px',
            color: isActive ? '#0d47a1' : '#1e395b',
            fontWeight: isActive ? 700 : 400,
            background: isActive ? 'linear-gradient(180deg, #e4effa 0%, #cce5f8 100%)' : 'transparent',
            border: `1px solid ${isActive ? '#99c9ef' : 'transparent'}`,
            transition: 'background 0.1s ease, border-color 0.1s ease',
          }}
        >
          {/* Arrow toggle for nodes */}
          {isBranch ? (
            <span
              onClick={(e) => toggleNode(item.id, e)}
              className="win7-tree-arrow"
              style={{
                display: 'inline-block',
                width: 12,
                textAlign: 'center',
                fontSize: '8px',
                color: isExpanded ? '#254d74' : '#607d8b',
                transform: isExpanded ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.12s ease',
              }}
            >
              ▶
            </span>
          ) : (
            <span style={{ width: 12, display: 'inline-block' }} />
          )}

          <VistaIcon id={item.icon || 'folder'} size={15} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.title}
          </span>
        </div>

        {/* Children if expanded */}
        {isBranch && isExpanded && (
          <div className="win7-tree-children">
            {item.items.map((child) => renderTreeItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isCollapsed) {
    return (
      <div
        className="win7-navpane-collapsed"
        style={{
          width: 24,
          background: 'linear-gradient(180deg, #f7fafd 0%, #ebf2f8 100%)',
          borderRight: '1px solid #c2d7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={onToggleCollapse}
        title="Show Navigation Pane"
      >
        <span style={{ fontSize: '10px', color: '#1a4e70' }}>▶</span>
      </div>
    );
  }

  return (
    <aside
      className="win7-navpane"
      style={{
        width: 210,
        flexShrink: 0,
        background: 'linear-gradient(180deg, #fbfcfe 0%, #f0f5fa 100%)',
        borderRight: '1px solid #b8c9d9',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '6px 4px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 6px 6px', borderBottom: '1px solid #e1ebf5', marginBottom: 4 }}>
        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#315273', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Navigation Pane
        </span>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', color: '#607d8b' }}
            title="Collapse Navigation Pane"
            aria-label="Collapse Navigation Pane"
          >
            ◀
          </button>
        )}
      </div>

      <div style={{ flex: 1 }}>
        {navTree.map((section) => renderTreeItem(section, 0))}
      </div>
    </aside>
  );
}
