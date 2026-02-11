import React, { useState, useEffect } from 'react';

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'array';
  options?: string[];
  required?: boolean;
}

interface AdminFormProps {
  title: string;
  fields: FieldConfig[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onCancel: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ title, fields, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const defaults: Record<string, any> = {};
      fields.forEach(f => {
        if (f.type === 'array') defaults[f.key] = [];
        else if (f.type === 'number') defaults[f.key] = 0;
        else defaults[f.key] = '';
      });
      setFormData(defaults);
    }
  }, [initialData, fields]);

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="w-full max-w-2xl border-2 border-cyan-500 bg-slate-950 p-6 md:p-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">{title}</h3>
          <button onClick={onCancel} className="text-[10px] text-cyan-500 font-black border border-cyan-500/30 px-3 py-1 hover:bg-cyan-500 hover:text-black transition-all uppercase">
            [ CLOSE ]
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(field => (
            <div key={field.key} className="space-y-1">
              <label className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors font-mono resize-none"
                  required={field.required}
                />
              ) : field.type === 'select' ? (
                <select
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 p-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors font-mono"
                  required={field.required}
                >
                  <option value="">-- SELECT --</option>
                  {field.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === 'number' ? (
                <input
                  type="number"
                  value={formData[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors font-mono"
                  required={field.required}
                />
              ) : field.type === 'array' ? (
                <input
                  type="text"
                  value={Array.isArray(formData[field.key]) ? formData[field.key].join(', ') : formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                  placeholder="comma-separated values"
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors font-mono"
                />
              ) : (
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors font-mono"
                  required={field.required}
                />
              )}
            </div>
          ))}

          {error && (
            <div className="text-[10px] text-red-400 font-black uppercase tracking-widest py-2 border border-red-500/30 bg-red-500/10 text-center">
              ERROR: {error}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 py-3 border-2 border-cyan-500 text-cyan-500 font-black uppercase italic tracking-widest hover:bg-cyan-500 hover:text-black transition-all text-sm ${saving ? 'opacity-50' : ''}`}
            >
              {saving ? 'SAVING...' : 'SAVE_RECORD ≫'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-white/20 text-white/50 font-black uppercase italic tracking-widest hover:text-white hover:border-white/50 transition-all text-sm"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
