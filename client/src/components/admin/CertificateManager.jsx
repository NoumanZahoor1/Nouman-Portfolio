import { FiPlus, FiTrash2, FiExternalLink } from 'react-icons/fi'

const CertificateManager = ({ certificates, onAdd, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-xl border border-white/5 overflow-hidden">
      <div className="p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
        <h2 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-white leading-none">Certifications</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-lg shadow-cyan-500/20"
        >
          <FiPlus size={16} />
          Upload New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 dark:bg-white/5">
            <tr>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Certificate</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Issuer</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Date</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {certificates.map((cert) => (
              <tr key={cert._id} className="hover:bg-gray-50/50 dark:hover:bg-white/1 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 overflow-hidden hidden sm:block">
                      <img src={cert.image} alt="" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <p className="font-black text-neutral-900 dark:text-white uppercase tracking-widest leading-none mb-2">{cert.title}</p>
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-cyan-500 uppercase tracking-widest font-black flex items-center gap-1 hover:underline">
                        View Original <FiExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{cert.issuer}</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{cert.date}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-end translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={() => onDelete(cert._id, 'certificate')}
                      className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CertificateManager
