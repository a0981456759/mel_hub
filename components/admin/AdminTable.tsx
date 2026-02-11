import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import AdminForm, { FieldConfig } from './AdminForm';

export interface TableConfig {
  tableName: string;
  label: string;
  fields: FieldConfig[];
  displayColumns: { key: string; label: string; render?: (val: any) => string }[];
  /** snake_case key in DB → camelCase key mapping for form display */
  mapFromDb?: (row: any) => Record<string, any>;
  /** camelCase form data → snake_case for DB insert/update */
  mapToDb?: (data: Record<string, any>) => Record<string, any>;
  readOnly?: boolean;
  orderBy?: string;
}

const AdminTable: React.FC<{ config: TableConfig }> = ({ config }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRow, setEditingRow] = useState<Record<string, any> | null>(null);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    let query = supabase.from(config.tableName).select('*');
    if (config.orderBy) {
      query = query.order(config.orderBy);
    }
    const { data, error } = await query;
    if (!error && data) {
      setRows(config.mapFromDb ? data.map(config.mapFromDb) : data);
    }
    setLoading(false);
  }, [config]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const handleCreate = async (formData: Record<string, any>) => {
    const dbData = config.mapToDb ? config.mapToDb(formData) : formData;
    const { error } = await supabase.from(config.tableName).insert(dbData);
    if (error) throw error;
    setShowForm(false);
    fetchRows();
  };

  const handleUpdate = async (formData: Record<string, any>) => {
    const dbData = config.mapToDb ? config.mapToDb(formData) : formData;
    const id = dbData.id;
    const { error } = await supabase.from(config.tableName).update(dbData).eq('id', id);
    if (error) throw error;
    setShowForm(false);
    setEditingRow(null);
    fetchRows();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('DELETE_THIS_RECORD?')) return;
    await supabase.from(config.tableName).delete().eq('id', id);
    fetchRows();
  };

  const openEdit = (row: any) => {
    setEditingRow(row);
    setShowForm(true);
  };

  const openCreate = () => {
    setEditingRow(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-[11px] text-cyan-500 font-black uppercase tracking-[0.3em]">
          {config.label} ({rows.length} RECORDS)
        </div>
        {!config.readOnly && (
          <button
            onClick={openCreate}
            className="text-[10px] border border-cyan-500 text-cyan-500 px-4 py-2 font-black uppercase hover:bg-cyan-500 hover:text-black transition-all"
          >
            + NEW_RECORD
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-white/10 bg-slate-950/80">
        {loading ? (
          <div className="p-8 text-center text-[10px] text-white/30 font-black uppercase tracking-widest animate-pulse">
            LOADING_RECORDS...
          </div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-[10px] text-white/30 font-black uppercase tracking-widest">
            NO_RECORDS_FOUND
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {config.displayColumns.map(col => (
                  <th key={col.key} className="px-4 py-3 text-[9px] text-white/50 font-black uppercase tracking-widest">
                    {col.label}
                  </th>
                ))}
                {!config.readOnly && (
                  <th className="px-4 py-3 text-[9px] text-white/50 font-black uppercase tracking-widest text-right">
                    ACTIONS
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-white/5 transition-colors">
                  {config.displayColumns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-xs text-white/80 font-mono max-w-[200px] truncate">
                      {col.render ? col.render(row[col.key]) : (
                        Array.isArray(row[col.key]) ? row[col.key].join(', ') : String(row[col.key] ?? '')
                      )}
                    </td>
                  ))}
                  {!config.readOnly && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          className="text-[9px] text-cyan-500 font-black uppercase border border-cyan-500/30 px-2 py-1 hover:bg-cyan-500 hover:text-black transition-all"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="text-[9px] text-red-400 font-black uppercase border border-red-500/30 px-2 py-1 hover:bg-red-500 hover:text-black transition-all"
                        >
                          DEL
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <AdminForm
          title={editingRow ? `EDIT_${config.label}` : `NEW_${config.label}`}
          fields={config.fields}
          initialData={editingRow || undefined}
          onSubmit={editingRow ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditingRow(null); }}
        />
      )}
    </div>
  );
};

export default AdminTable;
