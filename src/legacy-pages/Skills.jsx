import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import VistaIcon from '../components/VistaIcon';
import { skillCategories } from '../data/skills';

export default function Skills() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').toLowerCase().trim();

  const [activeCategory, setActiveCategory] = useState(null); // null = all
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('category'); // 'category' | 'details'

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const allFilteredItems = useMemo(() => {
    let items = [];
    skillCategories.forEach((cat) => {
      if (!activeCategory || activeCategory === cat.id) {
        cat.items.forEach((item) => {
          items.push({ ...item, categoryName: cat.name, catId: cat.id, icon: cat.icon });
        });
      }
    });

    if (query) {
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(query) ||
          i.role.toLowerCase().includes(query) ||
          i.level.toLowerCase().includes(query) ||
          i.categoryName.toLowerCase().includes(query)
      );
    }

    items.sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return items;
  }, [activeCategory, query, sortField, sortOrder]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ── Control Panel Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #c2d7eb', paddingBottom: 8, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <VistaIcon id="tool" size={32} />
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#0d3a5c' }}>
              Control Panel · Technical Skills & Tools
            </h1>
            <span style={{ fontSize: '11px', color: '#546e7a' }}>
              All Control Panel Items\Skills · Programming Languages, Frameworks, and Tools
            </span>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px' }}>
          <span style={{ color: '#546e7a' }}>Layout:</span>
          <button
            type="button"
            className={`aero-btn${viewMode === 'category' ? ' aero-btn-sky' : ''}`}
            onClick={() => {
              setViewMode('category');
              setActiveCategory(null);
            }}
            style={{ padding: '3px 10px', fontSize: '11px' }}
          >
            Category Cards
          </button>
          <button
            type="button"
            className={`aero-btn${viewMode === 'details' ? ' aero-btn-sky' : ''}`}
            onClick={() => setViewMode('details')}
            style={{ padding: '3px 10px', fontSize: '11px' }}
          >
            Details Table View
          </button>
        </div>
      </div>

      {query && (
        <div style={{ background: '#e1f5fe', border: '1px solid #81d4fa', padding: '6px 12px', fontSize: '11.5px', color: '#0277bd', borderRadius: 2 }}>
          Filtering by search query: <strong>"{query}"</strong> ({allFilteredItems.length} skills found)
        </div>
      )}

      {/* ── VIEW 1: Clean, Readable Category Cards (Default) ── */}
      {viewMode === 'category' && !query && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="win7-groupbox"
              style={{
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #e1ebf5', paddingBottom: 6 }}>
                <VistaIcon id={cat.icon} size={30} />
                <div>
                  <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#0d47a1', margin: 0 }}>
                    {cat.name}
                  </h2>
                  <span style={{ fontSize: '10.5px', color: '#78909c' }}>{cat.categoryName}</span>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '11.5px', color: '#546e7a', lineHeight: 1.4 }}>
                {cat.description}
              </p>

              {/* All skills in this category visible at a glance */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: 8 }}>
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      background: item.level === 'Primary' 
                        ? 'linear-gradient(180deg, #f0f7ff 0%, #d8ecfe 100%)' 
                        : 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
                      border: `1px solid ${item.level === 'Primary' ? '#80bdff' : '#cfd8dc'}`,
                      borderRadius: 4,
                      padding: '6px 8px',
                      fontSize: '11px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      boxShadow: '0 2px 4px rgba(10, 40, 70, 0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    title={`${item.name} — ${item.role} (${item.version})`}
                  >
                    {/* Top specular glint */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700, color: item.level === 'Primary' ? '#0d47a1' : '#1e395b' }}>
                        {item.name}
                      </span>
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '1px 4px',
                          borderRadius: 2,
                          background: item.level === 'Primary' ? '#00c853' : '#b0bec5',
                          color: '#ffffff',
                        }}
                      >
                        {item.level}
                      </span>
                    </div>

                    <span style={{ fontSize: '9.5px', color: '#546e7a', lineHeight: 1.3 }}>
                      {item.role}
                    </span>

                    <span style={{ fontSize: '9px', color: '#78909c', fontFamily: 'Consolas, monospace', marginTop: 'auto' }}>
                      {item.version}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 6 }}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setViewMode('details');
                  }}
                  className="aero-btn"
                  style={{ width: '100%', fontSize: '11px', padding: '3px 8px' }}
                >
                  View Full Specs & Versions ({cat.items.length} tools) ›
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── VIEW 2: Sortable Details Table View ── */}
      {(viewMode === 'details' || query) && (
        <div style={{ background: '#ffffff', border: '1px solid #b8c9d9', borderRadius: 2, overflow: 'hidden' }}>
          {activeCategory && !query && (
            <div style={{ background: '#eef5fb', padding: '6px 12px', borderBottom: '1px solid #d0dbe5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px' }}>
              <span>Category Filter: <strong>{skillCategories.find((c) => c.id === activeCategory)?.name}</strong></span>
              <button
                type="button"
                className="aero-btn"
                style={{ padding: '2px 8px', fontSize: '10.5px' }}
                onClick={() => setActiveCategory(null)}
              >
                Show All Categories
              </button>
            </div>
          )}

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(180deg, #f7f9fb 0%, #e9eff5 100%)', borderBottom: '1px solid #b8c9d9', userSelect: 'none' }}>
                <th
                  onClick={() => handleSort('name')}
                  style={{ padding: '7px 10px', textAlign: 'left', cursor: 'pointer', color: '#1e395b', borderRight: '1px solid #d0dbe5' }}
                >
                  Technology / Tool {sortField === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  onClick={() => handleSort('categoryName')}
                  style={{ padding: '7px 10px', textAlign: 'left', cursor: 'pointer', color: '#1e395b', borderRight: '1px solid #d0dbe5', width: 160 }}
                >
                  Category {sortField === 'categoryName' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  onClick={() => handleSort('role')}
                  style={{ padding: '7px 10px', textAlign: 'left', cursor: 'pointer', color: '#1e395b', borderRight: '1px solid #d0dbe5' }}
                >
                  Practical Use Case {sortField === 'role' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  onClick={() => handleSort('level')}
                  style={{ padding: '7px 10px', textAlign: 'left', cursor: 'pointer', color: '#1e395b', width: 130 }}
                >
                  Proficiency {sortField === 'level' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {allFilteredItems.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: 24, textAlign: 'center', color: '#78909c' }}>
                    No technical skills found matching "{query}".
                  </td>
                </tr>
              ) : (
                allFilteredItems.map((item, idx) => (
                  <tr
                    key={item.name}
                    className="win7-table-row"
                    style={{
                      borderBottom: '1px solid #f0f4f8',
                      background: idx % 2 === 0 ? '#ffffff' : '#fbfcfe',
                      transition: 'background 0.1s ease',
                    }}
                  >
                    <td style={{ padding: '6px 10px', fontWeight: 700, color: '#0d47a1', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <VistaIcon id={item.icon || 'tool'} size={16} />
                      {item.name}
                    </td>
                    <td style={{ padding: '6px 10px', color: '#546e7a', fontSize: '11px' }}>
                      {item.categoryName}
                    </td>
                    <td style={{ padding: '6px 10px', color: '#37474f' }}>
                      {item.role}
                    </td>
                    <td style={{ padding: '6px 10px' }}>
                      <span
                        style={{
                          fontSize: '10.5px',
                          padding: '1px 6px',
                          borderRadius: 2,
                          background: item.level === 'Primary' ? '#e3f2fd' : '#f5f5f5',
                          border: `1px solid ${item.level === 'Primary' ? '#90caf9' : '#cfd8dc'}`,
                          color: item.level === 'Primary' ? '#0d47a1' : '#455a64',
                          fontWeight: item.level === 'Primary' ? 700 : 500,
                        }}
                      >
                        {item.level}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
