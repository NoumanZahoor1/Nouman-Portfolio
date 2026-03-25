import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'

const ProjectManager = ({ projects, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-xl border border-white/5 overflow-hidden">
      <div className="p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
        <h2 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-white leading-none">Registered Projects</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-lg shadow-cyan-500/20"
        >
          <FiPlus size={16} />
          Add Project
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 dark:bg-white/5">
            <tr>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Project Info</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Category</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Status</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50/50 dark:hover:bg-white/1 transition-colors group">
                <td className="px-8 py-6">
                  <p className="font-black text-neutral-900 dark:text-white uppercase tracking-widest leading-none mb-2">{project.title}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500">
                    {project.category}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    project.status === 'completed'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {project.status || 'Active'}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={() => onEdit(project)}
                      className="p-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(project._id, 'project')}
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

export default ProjectManager
