/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { generateInvitationMessage, InvitationData } from './services/ai';
import { Loader2, Sparkles, MapPin, Phone, Link as LinkIcon, Copy, Check, Image as ImageIcon, Upload, X, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STYLES = [
  { id: 'botanical-circle', label: 'إطار مزهر (Botanical)', desc: 'دائري هادئ ومائي' },
  { id: 'classic-gold', label: 'ذهبي كلاسيكي (Gold)', desc: 'دافئ وأنيق' },
  { id: 'royal', label: 'ملكي (Royal)', desc: 'فخم ومذهّب (داكن)' },
  { id: 'minimalist', label: 'بسيط (Minimalist)', desc: 'هادئ وعصري' },
  { id: 'floral', label: 'وردي (Floral)', desc: 'رومانسي وناعم' },
];

const FONTS = [
  { id: 'font-amiri', label: 'أميري (Amiri)' },
  { id: 'font-cairo', label: 'كايرو (Cairo)' },
  { id: 'font-ruqaa', label: 'رقعة (Ruqaa)' },
];

export default function App() {
  const [formData, setFormData] = useState<InvitationData>({
    brideName: 'نورة',
    groomName: 'أحمد',
    city: 'الرياض',
    venue: 'قاعة فندق الريتز كارلتون',
    locationLink: 'https://maps.app.goo.gl/example',
    contactNumber: '0501234567',
    hostName: 'عبدالله بن محمد',
    hostRelation: 'والد العريس',
    guestName: 'خالد بن فهد',
    guestAge: '35',
    guestRelation: 'صديق مقرب',
    guestPersonality: 'دافئ وودود (Warm and friendly)',
    style: 'botanical-circle',
    fontFamily: 'font-amiri',
    backgroundImage: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [generatedText, setGeneratedText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [copied, setCopied] = useState(false);

  const getDesignerPrompt = (style: string) => {
    const base = "A beautiful vertical blank wedding invitation background design, empty center area for text, no typography, no words, elegant, high quality. ";
    if (style === 'botanical-circle') return base + "Watercolor floral borders with pink dahlias and light blue hydrangea flowers, dark teal and sage green leaves around the edges. The center is a large perfect white circle with a solid sage green outline border. Elegant, soft, bright natural lighting, cream background.";
    if (style === 'classic-gold') return base + "Classic white background with shiny gold calligraphic and arabesque filigree borders.";
    if (style === 'royal') return base + "Luxurious dark royal navy blue background with ornate shiny gold geometric Islamic patterns on the corners.";
    if (style === 'minimalist') return base + "Modern minimalist cream off-white background, subtle abstract clean aesthetic, elegant fine lines.";
    if (style === 'floral') return base + "Soft romantic watercolor blush pink roses and floral borders on a cream background.";
    return base;
  };

  const designerPrompt = getDesignerPrompt(formData.style);

  const handleCopy = () => {
    navigator.clipboard.writeText(designerPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, backgroundImage: url });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, backgroundImage: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const text = await generateInvitationMessage(formData);
    setGeneratedText(text);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex p-4 lg:p-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Section */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 lg:p-8 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2 flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-amber-500" />
              صانع الدعوات الاحترافي
            </h1>
            <p className="text-neutral-500">قم بتعبئة النموذج أدناه لصياغة نص دعوة زفاف مثالي باستخدام الذكاء الاصطناعي.</p>
          </div>
          
          <form className="space-y-8 flex-1" onSubmit={e => e.preventDefault()}>
            
            {/* العروسين */}
            <fieldset className="p-5 border border-neutral-100 bg-neutral-50/50 rounded-xl">
              <legend className="px-3 text-sm font-semibold text-amber-700 bg-amber-50 rounded-md border border-amber-100 py-1 mb-2">العروسين</legend>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">اسم العريس <span className="text-red-500">*</span></label>
                  <input name="groomName" value={formData.groomName} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition shadow-sm target-form-input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">اسم العروس <span className="text-red-500">*</span></label>
                  <input name="brideName" value={formData.brideName} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition shadow-sm target-form-input" />
                </div>
              </div>
            </fieldset>

            {/* الموقع */}
            <fieldset className="p-5 border border-neutral-100 bg-neutral-50/50 rounded-xl">
              <legend className="px-3 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-md border border-emerald-100 py-1 mb-2">المكان والزمان</legend>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">المدينة</label>
                  <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">اسم القاعة</label>
                  <input name="venue" value={formData.venue} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-sm" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-neutral-700">رابط الموقع (خرائط جوجل)</label>
                <input name="locationLink" dir="ltr" value={formData.locationLink} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-sm text-left font-mono text-sm" />
              </div>
            </fieldset>

            {/* الداعي */}
            <fieldset className="p-5 border border-neutral-100 bg-neutral-50/50 rounded-xl">
              <legend className="px-3 text-sm font-semibold text-blue-700 bg-blue-50 rounded-md border border-blue-100 py-1 mb-2">بيانات المُضيف (الداعي)</legend>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">الاسم</label>
                  <input name="hostName" value={formData.hostName} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">صلة القرابة</label>
                  <input name="hostRelation" placeholder="مثال: والد العريس، أخ العروس" value={formData.hostRelation} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-neutral-700">رقم التواصل (للاستفسار)</label>
                <input name="contactNumber" dir="ltr" placeholder="+966 5X XXX XXXX" value={formData.contactNumber} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-blue-500 text-left font-mono" />
              </div>
            </fieldset>

            {/* الضيف */}
            <fieldset className="p-5 border border-neutral-100 bg-neutral-50/50 rounded-xl relative overflow-hidden">
              {/* Highlight badge for AI customization */}
              <div className="absolute top-0 left-0 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-br-xl font-bold flex items-center gap-1"><Sparkles className="w-3 h-3"/> تخصيص الذكاء الاصطناعي</div>
              
              <legend className="px-3 text-sm font-semibold text-purple-700 bg-purple-50 rounded-md border border-purple-100 py-1 mb-2">تخصيص الدعوة للضيف</legend>
              <div className="grid grid-cols-2 gap-5 mb-5 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">اسم المدعو</label>
                  <input name="guestName" value={formData.guestName} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">العمر التقريبي</label>
                  <input name="guestAge" type="number" value={formData.guestAge} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">العلاقة بالضيف (مدير، صديق، عم...)</label>
                  <input name="guestRelation" value={formData.guestRelation} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-neutral-700">شخصية أو طابع الضيف</label>
                  <input name="guestPersonality" placeholder="رسمي، فكاهي المستحيل..." value={formData.guestPersonality} onChange={handleChange} className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-purple-500" />
                  <p className="text-xs text-neutral-500">هذا سيغير نبرة التوليد (Tone)</p>
                </div>
              </div>
            </fieldset>

            {/* التصميم والخلفيات */}
            <fieldset className="p-5 border border-neutral-100 bg-neutral-50/50 rounded-xl">
              <legend className="px-3 text-sm font-semibold text-rose-700 bg-rose-50 rounded-md border border-rose-100 py-1 mb-2">التصميم والمظهر</legend>
              
              <div className="space-y-6">
                {/* Visual Style */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-neutral-500" /> النمط البصري (للعرض والكلمات الدليلية)</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {STYLES.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormData({...formData, style: s.id})}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          formData.style === s.id 
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700'
                        }`}
                      >
                        <div className="font-semibold text-[13px]">{s.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selection */}
                <div className="space-y-3 border-t border-neutral-200/60 pt-4">
                  <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5"><Type className="w-4 h-4 text-neutral-500" /> نوع الخط العَربي الأساسي</label>
                  <div className="grid grid-cols-3 gap-3">
                    {FONTS.map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormData({...formData, fontFamily: f.id})}
                        className={`p-2.5 rounded-lg border text-center transition-all ${f.id} ${
                          formData.fontFamily === f.id || (!formData.fontFamily && f.id === 'font-amiri')
                            ? 'border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-500' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 text-neutral-600'
                        }`}
                      >
                        <div className="font-medium text-base">{f.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Background Image */}
                <div className="space-y-3 border-t border-neutral-200/60 pt-4">
                  <label className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5"><Upload className="w-4 h-4 text-neutral-500" /> رفع صورة خلفية مخصصة</label>
                  <div className="flex flex-col gap-3">
                    {formData.backgroundImage ? (
                      <div className="flex items-center gap-3 bg-white border border-neutral-200 rounded-lg p-2 pr-4 shadow-sm">
                        <img src={formData.backgroundImage} alt="Preview" className="w-10 h-10 object-cover rounded-md border border-neutral-100" />
                        <span className="text-sm text-neutral-600 flex-1 truncate">تم إرفاق صورة مخصصة (تُخفي الزخارف الافتراضية)</span>
                        <button type="button" onClick={removeImage} className="p-2 hover:bg-red-50 text-red-500 rounded-md transition"><X className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          ref={fileInputRef}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-full bg-white border border-dashed border-neutral-300 rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-2 text-neutral-500 hover:bg-neutral-50 hover:border-neutral-400 transition">
                          <Upload className="w-6 h-6 text-neutral-400" />
                          <span className="text-sm font-medium">اضغط هنا أو اسحب الصورة لرفعها</span>
                          <span className="text-xs text-neutral-400">ستظهر الصورة كخلفية بدلاً من الألوان الافتراضية للنمط</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </fieldset>
            
          </form>
          
          <div className="pt-6 mt-6 border-t border-neutral-100 sticky bottom-0 bg-white pb-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-500/20 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-70 shadow-md shadow-amber-500/20"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isGenerating ? 'جاري الصياغة...' : 'توليد نَص الدعوة بالذكاء الاصطناعي'}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-transparent flex items-center justify-center relative w-full h-[600px] overflow-hidden lg:p-0">
             <PreviewCard data={formData} text={generatedText} isGenerating={isGenerating} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5 mt-auto">
            <h3 className="text-sm font-bold text-neutral-800 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-500" />
              لتوليد الخلفية في (Microsoft Designer أو Midjourney)
            </h3>
            <p className="text-xs text-neutral-500 mb-3">انسخ هذا النص باللغة الإنجليزية والصقه في أي مولد صور للحصول على خلفية تتطابق مع نمطك المختار.</p>
            <div className="relative group">
              <textarea 
                readOnly 
                value={designerPrompt}
                className="w-full bg-neutral-50/80 border border-neutral-200 rounded-xl p-3 text-sm text-neutral-700 font-mono text-left focus:outline-none resize-none" 
                rows={4}
                dir="ltr"
              />
              <button 
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-white border border-neutral-200 rounded-lg shadow-sm hover:bg-neutral-50 transition text-neutral-700 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span className="text-xs font-semibold">{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ data, text, isGenerating }: { data: InvitationData, text: string, isGenerating: boolean }) {
  // Styles logic based on selected style
  let containerClasses = "w-full max-w-md aspect-[3/4] relative mx-auto shadow-2xl overflow-hidden rounded-sm transition-all duration-700 ease-in-out ";
  let textClasses = "z-10 relative flex flex-col h-full text-center px-8 py-12 ";
  
  const currentFont = data.fontFamily || 'font-amiri';

  if (data.style === 'botanical-circle') {
    containerClasses += "bg-[#fbf7f4]";
    textClasses += "text-[#597a75] items-center justify-center";
  } else if (data.style === 'classic-gold') {
    containerClasses += "bg-white border-4 border-double border-[#d4af37]";
    textClasses += "text-[#d4af37]";
  } else if (data.style === 'royal') {
    containerClasses += "bg-[#111c2e]";
    textClasses += "text-[#e5c158]";
  } else if (data.style === 'minimalist') {
    containerClasses += "bg-[#faf9f6]";
    textClasses += "text-[#333333]";
  } else if (data.style === 'floral') {
    containerClasses += "bg-[#fdf8e1]";
    textClasses += "text-[#5e4b3c]";
  }

  return (
    <div className={containerClasses}>
      {/* Custom Uploaded Background */}
      {data.backgroundImage && (
        <img src={data.backgroundImage} alt="Custom Background" className="absolute inset-0 w-full h-full object-cover z-0" />
      )}

      {/* Background decorations based on style (Only show if no custom image is uploaded) */}
      {!data.backgroundImage && (
        <AnimatePresence mode="wait">
          {data.style === 'botanical-circle' && (
            <motion.div key="botanical-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 pointer-events-none overflow-hidden isolate">
              <div className="absolute top-0 right-0 w-full h-full opacity-60">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#f8b4bc] rounded-full mix-blend-multiply blur-3xl" />
                <div className="absolute top-4 left-4 w-40 h-40 bg-[#d97c88] rounded-full mix-blend-multiply blur-2xl" />
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-[#a2c2df] rounded-full mix-blend-multiply blur-3xl hidden md:block" />
                <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#eba8b8] rounded-full mix-blend-multiply blur-3xl" />
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#6a97b0] rounded-full mix-blend-multiply blur-3xl" />
                <div className="absolute top-1/3 -left-12 w-32 h-32 bg-[#8eb29a] rounded-full mix-blend-multiply blur-2xl" />
                <div className="absolute bottom-1/4 -left-16 w-48 h-48 bg-[#b1d0b9] rounded-full mix-blend-multiply blur-3xl shadow-xl" />
                <div className="absolute top-1/4 -right-16 w-40 h-40 bg-[#0d4659] rounded-full mix-blend-multiply blur-3xl opacity-40" />
              </div>
              
              <svg className="absolute w-full h-full inset-0 opacity-40 mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
              </svg>
            </motion.div>
          )}
          {data.style === 'classic-gold' && (
            <motion.div key="classic-gold-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 pointer-events-none p-4">
              <div className="w-full h-full border border-[#d4af37]/30 relative mix-blend-multiply">
                {/* Filigree / Calligraphic corners */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#d4af37] opacity-60" />
                <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#d4af37] opacity-60" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#d4af37] opacity-60" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#d4af37] opacity-60" />
              </div>
            </motion.div>
          )}
          {data.style === 'royal' && (
            <motion.div key="royal-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-2 border-2 border-[#e5c158]/30 rounded-sm" />
              <div className="absolute inset-4 border border-[#e5c158]/20 rounded-sm" />
              {/* Simple corner ornaments */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#e5c158]/60" />
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#e5c158]/60" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#e5c158]/60" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#e5c158]/60" />
            </motion.div>
          )}
          {data.style === 'floral' && (
            <motion.div key="floral-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 pointer-events-none opacity-30">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#8c6d59]/40 fill-current">
                  <path d="M0,0 Q30,40 0,60 Q40,30 60,0 Z M100,100 Q70,60 100,40 Q60,70 40,100 Z" />
                </svg>
            </motion.div>
          )}
          {data.style === 'minimalist' && (
              <motion.div key="minimal-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-neutral-200/50 rounded-full blur-3xl" />
                <div className="absolute top-20 right-10 w-40 h-40 bg-neutral-200/30 rounded-full blur-3xl" />
              </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Keep the inner white circle for botanical style EVEN if they have a custom background, so text is readable, unless they explicitly want it gone, but let's keep it partial opacity if custom bg is set */}

      <div className={textClasses}>
        
        {data.style === 'botanical-circle' && (
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] aspect-square ${data.backgroundImage ? 'bg-white/80 backdrop-blur-sm' : 'bg-white'} rounded-full border-[3px] border-[#81a69e] shadow-[0_4px_30px_rgba(0,0,0,0.05)] z-0`} />
        )}

        <div className={`flex-col items-center justify-center gap-4 relative z-10 ${data.style === 'botanical-circle' ? 'flex w-[80%] aspect-square py-6 h-auto' : 'flex-1 flex h-full'}`}>
           
           <div className={`space-y-1 ${data.style === 'botanical-circle' ? 'mb-2 text-center' : 'mb-4'}`}>
             {(data.style === 'royal' || data.style === 'classic-gold') && <div className={`text-sm font-ruqaa mb-3 tracking-widest ${data.style === 'classic-gold' ? 'text-[#d4af37]' : 'text-[#e5c158]/80'}`}>بسم الله الرحمن الرحيم</div>}
             <h2 className={`${currentFont} font-bold tracking-tight mb-2 ${data.style === 'classic-gold' ? 'drop-shadow-sm text-5xl' : data.style === 'botanical-circle' ? 'text-4xl' : 'text-5xl'}`}>
                {data.groomName} <span className="opacity-70 text-2xl mx-1">&</span> {data.brideName}
             </h2>
           </div>

           {data.guestName && (
             <div className={`text-lg md:text-xl font-bold mt-1 mb-2 ${currentFont} text-center opacity-90`}>
                المكرّم / {data.guestName}
             </div>
           )}

           <div className={`text-base leading-relaxed overflow-hidden text-center ${currentFont} ${data.style === 'botanical-circle' ? 'text-[15px]' : ''} ${isGenerating ? 'opacity-50 blur-[2px]' : 'opacity-100'} transition-all duration-300 relative`}>
              {text ? (
                 <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} className={`whitespace-pre-wrap ${data.style === 'botanical-circle' ? 'line-clamp-6' : ''}`}>
                    {text}
                 </motion.div>
              ) : (
                <div className="opacity-40 italic">
                  انقر على "توليد" لصياغة نص الدعوة...
                </div>
              )}
           </div>

           {/* Footer Details */}
           <div className={`${data.style === 'botanical-circle' ? 'mt-auto pt-2 border-none text-xs' : 'mt-8 pt-6 border-t'} flex flex-col gap-2 font-cairo text-sm w-full ${data.style === 'royal' ? 'border-[#e5c158]/20' : data.style === 'classic-gold' ? 'border-[#d4af37]/30' : 'border-current/10'}`}>
             <div className="flex items-center justify-center gap-1.5">
                <MapPin className={`${data.style === 'botanical-circle' ? 'w-3 h-3' : 'w-4 h-4'} opacity-70`} />
                <span>{data.venue}، {data.city}</span>
             </div>
             <div className="flex justify-center gap-5">
                <a href={data.locationLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 opacity-80 hover:opacity-100 flex-row-reverse">
                   <LinkIcon className={`${data.style === 'botanical-circle' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                   <span className="underline underline-offset-4 decoration-current/30">الموقع</span>
                </a>
                <div className="flex items-center gap-1 opacity-80 flex-row-reverse" dir="ltr">
                   <span className={`${data.style === 'botanical-circle' ? 'text-xs' : ''}`}>{data.contactNumber}</span>
                   <Phone className={`${data.style === 'botanical-circle' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                </div>
             </div>
           </div>
           
        </div>
      </div>
    </div>
  );
}

