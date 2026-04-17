
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, ChevronDown, Mail, MapPin, Phone, ArrowRight, Globe, Shield, Zap } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#hero' },
    { name: '产品中心', href: '#products', children: [
      { name: '构建数字资产', href: '#products' },
      { name: '驱动组织增效', href: '#products' },
      { name: '加速人才赋能', href: '#products' },
    ]},
    { name: '关于我们', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-stone-950/90 backdrop-blur-xl shadow-lg py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-sans font-medium text-xl tracking-wide text-white uppercase">互远AI</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <a href={link.href} className="text-sm font-normal uppercase tracking-widest text-white/70 hover:text-white transition-colors flex items-center gap-1">
                {link.name}
                {link.children && <ChevronDown size={12} className="opacity-40" />}
              </a>
              {link.children && (
                <div className="absolute top-full left-0 mt-4 w-48 bg-stone-900 shadow-xl border border-white/5 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white">
                  {link.children.map((child) => (
                    <a key={child.name} href={child.href} className="block px-6 py-2 text-xs uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                      {child.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="px-8 py-3 bg-blue-600 text-white text-xs font-semibold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-900/20">
            立即咨询
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-stone-950 border-t border-white/5 shadow-2xl py-8 px-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col gap-4">
                <a href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-sans font-medium text-white uppercase tracking-tight">{link.name}</a>
                {link.children && (
                  <div className="flex flex-col gap-3 pl-4 border-l border-white/10">
                    {link.children.map((child) => (
                      <a key={child.name} href={child.href} onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/50 hover:text-white uppercase tracking-widest">{child.name}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ icon: Icon, title, description, index }: { icon: any, title: string, description: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    viewport={{ once: true }}
    className="group p-12 bg-white border border-stone-100 hover:border-blue-600 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={120} />
    </div>
    <div className="w-12 h-12 bg-stone-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
      <Icon size={24} />
    </div>
    <h3 className="font-sans font-semibold text-3xl text-stone-900 mb-4">{title}</h3>
    <p className="text-stone-500 font-light leading-relaxed mb-8 flex-grow">{description}</p>
    <div className="mt-auto">
      <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white text-xs font-semibold uppercase tracking-widest hover:bg-blue-700 transition-all rounded-sm shadow-md hover:shadow-lg hover:shadow-blue-600/20 w-full sm:w-auto">
        了解更多 <ArrowRight size={14} />
      </a>
    </div>
  </motion.div>
);

const App: React.FC = () => {
  return (
    <div className="bg-stone-50 font-sans text-stone-900 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main>
        {/* Screen 1: Hero Banner */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900 text-white">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Huyuan AI Team Collaboration" 
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/35" />
          </div>

          <div className="relative z-10 container mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-sans font-medium text-4xl md:text-6xl lg:text-8xl text-white mb-12 leading-snug tracking-tight uppercase">
                全链路AI营销增长 <br /><span className="text-blue-500">· 组织增效专家</span>
              </h1>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-stone-300 font-light leading-relaxed mb-12">
                一家以OPC（AI生产力中心）生态为基石，深耕全链路营销与智能销售的技术研发商。 <br className="hidden md:block" />
                <span className="text-sm uppercase tracking-widest opacity-60">A technology developer rooted in the OPC (AI Productivity Center) ecosystem, specializing in full-link marketing and intelligent sales.</span>
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
                <button className="px-10 py-5 bg-blue-600 text-white text-sm font-semibold uppercase tracking-widest hover:bg-blue-700 transition-all">
                  产品中心
                </button>
                <button className="px-10 py-5 border border-white/30 text-white text-sm font-semibold uppercase tracking-widest hover:bg-white/10 transition-all">
                  立即咨询
                </button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
            <ChevronDown size={32} />
          </div>
        </section>

        {/* Screen 2: Core Values */}
        <section id="products" className="min-h-screen py-32 bg-white flex flex-col justify-center">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mb-20">
                <span className="text-sm font-medium tracking-[0.2em] text-stone-400 font-display uppercase mb-4 block">互远AI（Huyuan AI）</span>
                <h2 className="font-sans font-medium text-3xl md:text-4xl text-stone-900 mb-8 leading-tight">将复杂的AI技术转化为易落地、可量化的全链路方案 <br className="hidden md:block" />协助企业实现三大核心价值</h2>
                <p className="text-xl text-stone-500 font-light leading-relaxed">
                  帮企业实现全链路营销增长与组织增效；<br />
                  帮个人快速适应 AI 时代、掌握实战技能，打通高价值的变现通路。 <br className="hidden md:block" />
                  <span className="text-sm font-medium text-stone-400 font-display uppercase tracking-widest mt-4 inline-block opacity-60">
                    Transforming complex AI technology into actionable, quantifiable full-link solutions.
                  </span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-100 border border-stone-100">
              <ProductCard 
                index={0}
                icon={Globe}
                title="构建数字资产"
                description="依托GEO（生成式引擎优化）与智能建站技术，确保品牌在AI搜索时代获得首选推荐；通过思维克隆与IP定制，打造24小时在线的数字化智慧资产。"
              />
              <ProductCard 
                index={1}
                icon={Zap}
                title="驱动组织增效"
                description="定制开发AI智能销售系统与专属工作流，提供即插即用的定制化Skill，最大程度消除冗余人工，实现业务效能质变。"
              />
              <ProductCard 
                index={2}
                icon={Shield}
                title="加速人才赋能"
                description="依托OPC生态，通过“以工代练”模式为企业培养AI原生人才，助力组织跨越认知迷茫期，实现人才效能升级。"
              />
            </div>
          </div>
        </section>

        {/* Screen 3: Contact / Lead Gen */}
        <section id="contact" className="min-h-screen py-32 bg-stone-50 flex items-center">
          <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-sm font-medium tracking-widest text-stone-400 font-display uppercase mb-4 block opacity-60">联系我们</span>
              <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-8">开启AI时代的 <br />确定性增长。</h2>
              <p className="text-lg text-stone-500 mb-12 leading-relaxed italic">
                互远AI总部位于北京，核心研发团队曾长期服务于国际一线VC机构，并为多家D+轮企业及国央企提供深度的技术服务。
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium uppercase tracking-widest text-stone-400 font-display opacity-60">电子邮箱</div>
                    <div className="text-stone-900 font-medium">huyuanai@66plat.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium uppercase tracking-widest text-stone-400 font-display opacity-60">联系电话</div>
                    <div className="text-stone-900 font-medium">15827008187</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 shadow-2xl border border-stone-100">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-widest text-stone-400 font-display opacity-60">姓名</label>
                    <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-100 focus:border-blue-600 focus:bg-white outline-none transition-all text-sm font-light" placeholder="您的姓名" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-widest text-stone-400 font-display opacity-60">电话</label>
                    <input type="tel" className="w-full px-4 py-3 bg-stone-50 border border-stone-100 focus:border-blue-600 focus:bg-white outline-none transition-all text-sm font-light" placeholder="您的电话" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-widest text-stone-400 font-display opacity-60">公司名称</label>
                  <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-100 focus:border-blue-600 focus:bg-white outline-none transition-all text-sm font-light" placeholder="您的公司" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-widest text-stone-400 font-display opacity-60">需求描述</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-stone-50 border border-stone-100 focus:border-blue-600 focus:bg-white outline-none transition-all text-sm font-light resize-none" placeholder="请描述您的业务需求" />
                </div>
                <button className="w-full py-4 bg-blue-600 text-white text-xs font-semibold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">
                  提交咨询
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Screen 4: Footer */}
      <footer className="bg-stone-900 text-white py-24 border-t border-white/5">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                <span className="font-sans font-medium text-xl tracking-wide text-white uppercase">互远AI</span>
              </div>
              <p className="text-stone-400 leading-relaxed mb-8 max-w-xs">
                互远不仅是工具的提供者，更是企业在AI时代实现业绩确定性增长的战略合伙人。
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                  <Globe size={16} />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                  <Shield size={16} />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-sans font-semibold text-sm tracking-widest text-white mb-8">产品中心</h4>
              <ul className="space-y-4 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">构建数字资产</a></li>
                <li><a href="#" className="hover:text-white transition-colors">驱动组织增效</a></li>
                <li><a href="#" className="hover:text-white transition-colors">加速人才赋能</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-sans font-semibold text-sm tracking-widest text-white mb-8">关于我们</h4>
              <ul className="space-y-4 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">公司简介</a></li>
                <li><a href="#" className="hover:text-white transition-colors">技术团队</a></li>
                <li><a href="#" className="hover:text-white transition-colors">合作伙伴</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-sans font-semibold text-sm tracking-widest text-white mb-8">总部地址</h4>
              <div className="space-y-6 text-sm text-stone-400">
                <div className="flex gap-4">
                  <MapPin size={18} className="shrink-0 text-stone-600" />
                  <span>中国 · 北京市<br />石景山区</span>
                </div>
                <div className="flex gap-4">
                  <Phone size={18} className="shrink-0 text-stone-600" />
                  <span>15827008187</span>
                </div>
                <button className="group px-8 py-3 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3">
                  在线咨询 <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-600">
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-400 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-stone-400 transition-colors">服务条款</a>
              <a href="#" className="hover:text-stone-400 transition-colors">Cookie 设置</a>
            </div>
            <div>© 2026 互远AI (Huyuan AI). 保留所有权利。</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

