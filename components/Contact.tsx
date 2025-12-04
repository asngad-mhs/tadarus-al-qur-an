import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Hapus kesalahan untuk bidang yang sedang diedit
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Format alamat email tidak valid.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const phoneNumber = "6289670924182"; // Nomor HP dengan kode negara Indonesia
      const messageText = `Halo, saya ingin bertanya.\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div id="contact" className="py-16 bg-gray-800/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Hubungi Kami</h2>
        <p className="text-center text-gray-400 mb-8 max-w-xl mx-auto">Punya pertanyaan atau masukan? Kami ingin sekali mendengar dari Anda. Isi formulir di bawah ini untuk menghubungi kami.</p>
        
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 text-white transition-all duration-300 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-teal-500'}`}
                  placeholder="Nama Anda"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Alamat Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 text-white transition-all duration-300 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-teal-500'}`}
                  placeholder="anda@contoh.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Pesan</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 text-white transition-all duration-300 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-teal-500'}`}
                  placeholder="Pesan Anda..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
              </div>
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Kirim via WhatsApp
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;