import { useState } from 'react';
import VistaIcon from '../components/VistaIcon';
import { experienceLogs } from '../data/experience';

export default function Experience() {
  const [selectedLogId, setSelectedLogId] = useState(experienceLogs[0].id);
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'details'
  const [filterLogName, setFilterLogName] = useState('All'); // 'All' | 'Application' | 'Setup' | 'System'

  const filteredLogs = experienceLogs.filter((log) =>
    filterLogName === 'All' ? true : log.logName === filterLogName
  );

  const selectedLog = experienceLogs.find((l) => l.id === selectedLogId) || experienceLogs[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
      {/* ── Event Viewer Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #c2d7eb', paddingBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <VistaIcon id="film" size={26} />
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0d3a5c' }}>
              Work Experience & Roles · Event Viewer
            </h1>
            <span style={{ fontSize: '11px', color: '#546e7a' }}>
              Event Viewer (Local)\Windows Logs\Experience · {filteredLogs.length} verified roles logged
            </span>
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '11px' }}>
          <span style={{ color: '#546e7a' }}>Filter Category:</span>
          {['All', 'Application', 'Setup', 'System'].map((type) => (
            <button
              key={type}
              type="button"
              className={`aero-btn${filterLogName === type ? ' aero-btn-sky' : ''}`}
              onClick={() => setFilterLogName(type)}
              style={{ padding: '2px 8px', fontSize: '11px' }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* ── Instruction hint for visitors ── */}
      <div style={{ background: '#f5f9fc', border: '1px solid #c8dced', padding: '6px 12px', fontSize: '11.5px', color: '#1a4e72', borderRadius: 2 }}>
        Click any role in the table below to inspect detailed responsibilities, technical impact, and tools used.
      </div>

      {/* ── Experience Table (Upper Pane) ── */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #b8c9d9',
          borderRadius: 2,
          overflowY: 'auto',
          maxHeight: 210,
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(180deg, #f7f9fb 0%, #e9eff5 100%)', borderBottom: '1px solid #b8c9d9', userSelect: 'none' }}>
              <th style={{ padding: '6px 10px', textAlign: 'left', width: 220, color: '#1e395b' }}>Role & Title</th>
              <th style={{ padding: '6px 10px', textAlign: 'left', color: '#1e395b' }}>Company / Organization</th>
              <th style={{ padding: '6px 10px', textAlign: 'left', width: 140, color: '#1e395b' }}>Period</th>
              <th style={{ padding: '6px 10px', textAlign: 'left', width: 120, color: '#1e395b' }}>Log Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => {
              const isSelected = selectedLog?.id === log.id;
              return (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLogId(log.id)}
                  className="win7-table-row"
                  style={{
                    borderBottom: '1px solid #f0f4f8',
                    background: isSelected ? '#cce5f8' : '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  <td style={{ padding: '6px 10px', fontWeight: 700, color: '#0d47a1', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <VistaIcon id="briefcase" size={16} />
                    {log.title}
                  </td>
                  <td style={{ padding: '6px 10px', color: '#1e395b', fontWeight: 600 }}>
                    {log.organization}
                  </td>
                  <td style={{ padding: '6px 10px', color: '#546e7a' }}>
                    {log.period}
                  </td>
                  <td style={{ padding: '6px 10px', color: '#78909c' }}>
                    <span
                      style={{
                        background: '#eef3f8',
                        border: '1px solid #cfd8dc',
                        padding: '1px 5px',
                        borderRadius: 2,
                        fontSize: '10px',
                      }}
                    >
                      {log.logName} (ID: {log.id})
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Experience Details Pane (Lower Pane) ── */}
      {selectedLog && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid #94b2d1', borderRadius: 2, background: '#ffffff', minHeight: 200 }}>
          {/* Tab Strip */}
          <div style={{ display: 'flex', gap: 2, background: 'linear-gradient(180deg, #f2f7fc 0%, #e1eefa 100%)', borderBottom: '1px solid #94b2d1', padding: '4px 8px 0' }}>
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              style={{
                padding: '4px 14px',
                fontSize: '11.5px',
                fontWeight: activeTab === 'general' ? 700 : 500,
                color: activeTab === 'general' ? '#0d47a1' : '#37474f',
                background: activeTab === 'general' ? '#ffffff' : 'transparent',
                border: activeTab === 'general' ? '1px solid #94b2d1' : '1px solid transparent',
                borderBottom: activeTab === 'general' ? '1px solid #ffffff' : 'none',
                borderRadius: '2px 2px 0 0',
                marginBottom: -1,
                cursor: 'pointer',
              }}
            >
              Role Summary & Deliverables
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              style={{
                padding: '4px 14px',
                fontSize: '11.5px',
                fontWeight: activeTab === 'details' ? 700 : 500,
                color: activeTab === 'details' ? '#0d47a1' : '#37474f',
                background: activeTab === 'details' ? '#ffffff' : 'transparent',
                border: activeTab === 'details' ? '1px solid #94b2d1' : '1px solid transparent',
                borderBottom: activeTab === 'details' ? '1px solid #ffffff' : 'none',
                borderRadius: '2px 2px 0 0',
                marginBottom: -1,
                cursor: 'pointer',
              }}
            >
              Technical Event Log (XML View)
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ padding: '14px', overflowY: 'auto', flex: 1, fontSize: '12px', color: '#1e395b' }}>
            {activeTab === 'general' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', paddingBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <VistaIcon id="briefcase" size={32} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0d3a5c' }}>
                        {selectedLog.title}
                      </div>
                      <div style={{ color: '#0288d1', fontWeight: 600, fontSize: '12px' }}>
                        {selectedLog.organization}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '11.5px', color: '#546e7a' }}>
                    <div><strong>Duration:</strong> {selectedLog.period}</div>
                    <div><strong>Workstation:</strong> {selectedLog.computer}</div>
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: 700, color: '#0d3a5c', marginBottom: 4 }}>Role Overview & Background:</div>
                  <div style={{ lineHeight: 1.6, color: '#37474f', fontSize: '12px' }}>
                    {selectedLog.generalDesc}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 8 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6, color: '#0d3a5c' }}>Key Responsibilities & Deliverables:</div>
                  <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6, color: '#37474f' }}>
                    {selectedLog.bullets.map((b, idx) => (
                      <li key={idx} style={{ marginBottom: 4 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '11px', color: '#546e7a', marginBottom: 6 }}>
                  Raw Windows Event Viewer system log representation for this role:
                </div>
                <pre
                  style={{
                    margin: 0,
                    fontFamily: 'Consolas, monospace',
                    fontSize: '11px',
                    background: '#f8fafc',
                    padding: 10,
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    lineHeight: 1.45,
                    overflowX: 'auto',
                  }}
                >
{`- <Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  - <System>
      <Provider Name="${selectedLog.source}" />
      <EventID>${selectedLog.xmlDetails.EventID}</EventID>
      <Version>${selectedLog.xmlDetails.Version}</Version>
      <Level>${selectedLog.xmlDetails.Level}</Level>
      <Task>${selectedLog.xmlDetails.Task}</Task>
      <Opcode>${selectedLog.xmlDetails.Opcode}</Opcode>
      <Keywords>${selectedLog.xmlDetails.Keywords}</Keywords>
      <TimeCreated SystemTime="${selectedLog.date}" />
      <Execution ProcessID="${selectedLog.xmlDetails.ExecutionProcessID}" ThreadID="${selectedLog.xmlDetails.ExecutionThreadID}" />
      <Computer>${selectedLog.computer}</Computer>
      <Security UserID="${selectedLog.user}" />
    </System>
  </Event>`}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
