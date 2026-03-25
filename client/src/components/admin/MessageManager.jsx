import { FiTrash2, FiClock, FiUser, FiInfo } from 'react-icons/fi'

const MessageManager = ({ messages, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-xl border border-white/5 overflow-hidden">
      <div className="p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
        <h2 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-white leading-none">Inbound Inquiries</h2>
        <span className="px-4 py-1.5 bg-purple-500/10 text-purple-500 rounded-full text-[9px] font-black uppercase tracking-widest">
          {messages.length} Total
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50 dark:bg-white/5">
            <tr>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Sender</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Message Content</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {messages.map((message) => (
              <tr key={message._id} className="hover:bg-gray-50/50 dark:hover:bg-white/1 transition-colors group">
                <td className="px-8 py-6 align-top">
                  <div className="space-y-3">
                    <p className="font-black text-neutral-900 dark:text-white uppercase tracking-widest leading-none flex items-center gap-2">
                      <FiUser size={12} className="text-cyan-500" /> {message.name}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black leading-none">{message.email}</p>
                    <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      <FiClock size={10} /> {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 align-top">
                  <div className="space-y-4 max-w-xl">
                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <FiInfo size={12} /> {message.subject}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                      {message.message}
                    </p>
                  </div>
                </td>
                <td className="px-8 py-6 align-top">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <button
                      onClick={() => onDelete(message._id, 'message')}
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

export default MessageManager
