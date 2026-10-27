"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Code2,
  Terminal,
  Layers,
  Cpu,
  Mail,
  Flame,
  PlusCircle,
  Trash2,
  GraduationCap,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export default function CreativePortfolio() {
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State untuk menambah proyek baru
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newImage, setNewImage] = useState("");

  // Load data proyek dan paksa update gambar proyek utama
  useEffect(() => {
    const initialProjects: Project[] = [
      {
        id: 1,
        title: "StockMaster Pro (CRUD)",
        category: "Fullstack • Spring Boot",
        description:
          "Aplikasi Manajemen Inventaris lengkap dengan fitur CRUD, kalkulasi stok real-time, dan integrasi database MySQL.",
        tech: ["Spring Boot", "MySQL", "Java", "Tailwind"],
        link: "http://localhost:8080",
        image: "/stockmaster-pro.png", // Mengarahkan langsung ke gambar di folder public
      },
    ];

    const savedProjects = localStorage.getItem("portfolio_projects");
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      // Memastikan proyek pertama selalu menggunakan gambar yang benar
      if (parsed.length > 0) {
        parsed[0].image = "/stockmaster-pro.png";
      }
      setProjects(parsed);
    } else {
      setProjects(initialProjects);
      localStorage.setItem(
        "portfolio_projects",
        JSON.stringify(initialProjects),
      );
    }
  }, []);

  const saveProjects = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  // Handler Tambah Proyek
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj: Project = {
      id: Date.now(),
      title: newTitle,
      category: newCategory || "Web App",
      description: newDesc,
      tech: newTech
        ? newTech.split(",").map((t) => t.trim())
        : ["Next.js", "Tailwind"],
      link: newLink || "#",
      image: newImage || "/stockmaster-pro.png",
    };

    const updated = [newProj, ...projects];
    saveProjects(updated);

    // Reset form & tutup modal
    setNewTitle("");
    setNewCategory("");
    setNewDesc("");
    setNewTech("");
    setNewLink("");
    setNewImage("");
    setShowAddModal(false);
  };

  // Handler Hapus Proyek
  const handleDeleteProject = (id: number) => {
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
  };

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter(
          (p) =>
            p.category.toLowerCase().includes(activeTab) ||
            p.tech.some((t) => t.toLowerCase().includes(activeTab)),
        );

  return (
    <div className="bg-[#09090b] text-zinc-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Floating Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/80 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm shadow-md">
            IF
          </div>
          <span className="font-semibold tracking-tight text-sm hidden sm:inline">
            Imam Firdaus
          </span>
        </div>

        <nav className="flex items-center gap-6 text-xs sm:text-sm text-zinc-400 font-medium">
          <a href="#about" className="hover:text-white transition">
            Tentang
          </a>
          <a href="#projects" className="hover:text-white transition">
            Proyek
          </a>
          <a href="#skills" className="hover:text-white transition">
            Keahlian
          </a>
        </nav>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-indigo-600/20"
        >
          <PlusCircle size={14} /> Tambah Proyek
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 pt-36 pb-20 relative z-10">
        {/* Hero Section */}
        <section
          id="about"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="md:col-span-2 bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800/80 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group shadow-xl">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition duration-500"></div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-indigo-500/10 text-indigo-400 px-3.5 py-1.5 rounded-full border border-indigo-500/20 mb-6">
                <Sparkles size={13} /> Mahasiswa Aktif • Semester 3
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                Hi, saya{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Imam Firdaus
                </span>
                .
              </h1>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-4 leading-relaxed">
              Mahasiswa Teknologi Informasi Universitas Negeri Yogyakarta
              Angkatan 2025. Antusias dalam mengeksplorasi pengembangan
              perangkat lunak, merancang arsitektur backend yang tangguh dengan
              Spring Boot & MySQL, serta membangun antarmuka web interaktif
              menggunakan Next.js.
            </p>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 p-8 rounded-3xl flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">
                STATUS AKADEMIK
              </span>
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>
            <div className="my-6">
              <h3 className="text-base font-bold mb-1 flex items-center gap-2 text-zinc-200">
                <GraduationCap size={20} className="text-indigo-400" /> UNY 2025
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                S1 Teknologi Informasi
                <br />
                Fakultas Teknik
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <Flame size={16} className="text-amber-400" /> Yogyakarta,
              Indonesia
            </div>
          </div>
        </section>

        {/* Tech Stack & Skills Bento */}
        <section
          id="skills"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500/50 transition">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Code2 size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Frontend</h4>
              <p className="text-xs text-zinc-400">Next.js, React, Tailwind</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center gap-4 hover:border-purple-500/50 transition">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
              <Terminal size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Backend & DB</h4>
              <p className="text-xs text-zinc-400">Spring Boot, MySQL, Java</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center gap-4 hover:border-pink-500/50 transition">
            <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl">
              <Layers size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Arsitektur</h4>
              <p className="text-xs text-zinc-400">RESTful API, Sistem CRUD</p>
            </div>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center gap-4 hover:border-emerald-500/50 transition">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Cpu size={22} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Tools</h4>
              <p className="text-xs text-zinc-400">Git, Docker, Postman</p>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section id="projects" className="mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold block mb-1">
                Portofolio Akademik & Mandiri
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Proyek Unggulan
              </h2>
            </div>

            <div className="flex gap-2 bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-1.5 rounded-full transition cursor-pointer ${activeTab === "all" ? "bg-indigo-600 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
              >
                Semua Proyek
              </button>
              <button
                onClick={() => setActiveTab("spring")}
                className={`px-4 py-1.5 rounded-full transition cursor-pointer ${activeTab === "spring" ? "bg-indigo-600 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
              >
                Spring Boot
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 hover:border-indigo-500/40 transition duration-300 flex flex-col justify-between group relative shadow-xl"
              >
                <div>
                  {/* Container Gambar Proyek Asli */}
                  <div className="h-52 bg-zinc-950 rounded-2xl mb-6 border border-zinc-800/60 overflow-hidden relative flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-indigo-400 font-medium">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 bg-zinc-800/50 rounded-full hover:bg-rose-500/20 hover:text-rose-400 text-zinc-500 transition cursor-pointer"
                        title="Hapus Proyek"
                      >
                        <Trash2 size={14} />
                      </button>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-zinc-800/50 rounded-full hover:bg-indigo-600 hover:text-white transition"
                        title="Kunjungi Proyek"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition text-zinc-100">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono bg-zinc-800/60 text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Form Tambah Project */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-indigo-400 flex items-center gap-2">
                <PlusCircle size={20} /> Tambah Proyek Portofolio Baru
              </h3>

              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Judul Proyek
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Sistem Perpustakaan Digital"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Fullstack • Next.js"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    URL Gambar / Path
                  </label>
                  <input
                    type="text"
                    placeholder="/stockmaster-pro.png"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan fitur dan teknologi yang digunakan..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Teknologi (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="React, Node.js, PostgreSQL"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Link Demo / GitHub
                  </label>
                  <input
                    type="text"
                    placeholder="https://github.com/imamfirdaus/..."
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-lg shadow-indigo-600/20"
                  >
                    Simpan Proyek
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Contact CTA Section */}
        <section
          id="contact"
          className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-zinc-900/60 border border-indigo-500/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Tertarik berkolaborasi atau berdiskusi?
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm sm:text-base mb-8 leading-relaxed">
            Mari terhubung untuk membahas proyek teknologi, pengembangan web,
            atau peluang kolaborasi lainnya.
          </p>

          <div className="flex justify-center gap-4 flex-wrap items-center">
            <a
              href="mailto:imamfirdaus571@gmail.com"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition shadow-lg shadow-indigo-600/25 text-sm"
            >
              <Mail size={16} /> imamfirdaus571@gmail.com
            </a>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ImamFirdaus06"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:border-zinc-700 transition flex items-center justify-center text-zinc-300 hover:text-white"
                aria-label="GitHub"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/imam-firdaus-viar-prasetyo-76930b447?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:border-zinc-700 transition flex items-center justify-center text-zinc-300 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-xs text-zinc-500 relative z-10 font-medium">
        <p>
          © 2026 Imam Firdaus Viar Prasetyo • Mahasiswa Teknologi Informasi UNY
          • Dibangun dengan Next.js & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
