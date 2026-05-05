/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { generateInvitationMessage, generateInvitationDesign, InvitationData } from './services/ai';
import { Loader2, Sparkles, MapPin, Phone, Link as LinkIcon, Copy, Check, Image as ImageIcon, Upload, X, Type, Download, Calendar, Clock, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';

const STYLES = [
  { id: 'botanical-circle', label: 'إطار مزهر (Botanical)', desc: 'دائري هادئ ومائي' },
  { id: 'eternal-blossom', label: 'عروسين (Eternal)', desc: 'رسم توضيحي أنيق' },
  { id: 'classic-gold', label: 'ذهبي كلاسيكي (Gold)', desc: 'دافئ وأنيق' },
  { id: 'royal', label: 'ملكي (Royal)', desc: 'فخم ومذهّب (داكن)' },
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
    date: '2024-10-20',
    time: '20:00',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [generatedText, setGeneratedText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDesigning, setIsDesigning] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerateDesign = async () => {
    setIsDesigning(true);
    try {
      const designUrl = await generateInvitationDesign(formData);
      if (designUrl) {
        setFormData(prev => ({ ...prev, backgroundImage: designUrl }));
      }
    } catch (error) {
      console.error('Design generation failed', error);
    } finally {
      setIsDesigning(false);
    }
  };

  const downloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
      const image = canvas.toDataURL("image/jpeg", 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'wedding-invitation.jpg';
      link.click();
    } catch (error) {
      console.error('Error generating image', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d\+\-\s()]/g, '');
    setFormData({ ...formData, [e.target.name]: val });
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
    <div className="min-h-screen bg-[#FFF6F8] flex p-4 md:p-6 lg:p-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Form Section */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-[0_8px_30px_rgb(231,167,181,0.08)] border border-[#FFF6F8] p-6 lg:p-8 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3A3A3A] mb-2 flex items-center gap-3">
              InviteMe
            </h1>
            <p className="text-[#8A8A8A]">قم بتعبئة النموذج أدناه لصياغة نص دعوة زفاف مثالي باستخدام الذكاء الاصطناعي.</p>
          </div>
          
          <form className="space-y-8 flex-1" onSubmit={e => e.preventDefault()}>
            
            {/* العروسين */}
            <fieldset className="p-5 border border-[#A7BFA8]/20 bg-[#FFF6F8]/30 rounded-xl">
              <legend className="px-3 text-sm font-semibold text-[#3A3A3A] bg-[#A7BFA8]/20 rounded-md border border-[#A7BFA8]/30 py-1 mb-2">العروسين</legend>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">اسم العريس <span className="text-[#E7A7B5]">*</span></label>
                  <input name="groomName" value={formData.groomName} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] outline-none transition shadow-sm text-[#3A3A3A] target-form-input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">اسم العروس <span className="text-[#E7A7B5]">*</span></label>
                  <input name="brideName" value={formData.brideName} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] outline-none transition shadow-sm text-[#3A3A3A] target-form-input" />
                </div>
              </div>
            </fieldset>

            {/* الموقع */}
            <fieldset className="p-5 border border-[#A7BFA8]/20 bg-[#FFF6F8]/30 rounded-xl">
              <legend className="px-3 text-sm font-semibold text-[#3A3A3A] bg-[#A7BFA8]/20 rounded-md border border-[#A7BFA8]/30 py-1 mb-2">المكان والزمان</legend>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">المدينة</label>
                  <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] outline-none transition shadow-sm text-[#3A3A3A]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">اسم القاعة</label>
                  <input name="venue" value={formData.venue} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] outline-none transition shadow-sm text-[#3A3A3A]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">التاريخ</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] outline-none transition shadow-sm text-[#3A3A3A]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">الوقت</label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] outline-none transition shadow-sm text-[#3A3A3A]" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#8A8A8A]">رابط الموقع (خرائط جوجل)</label>
                <input name="locationLink" dir="ltr" value={formData.locationLink} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] outline-none transition shadow-sm text-[#3A3A3A] text-left font-mono text-sm" />
              </div>
            </fieldset>

            {/* الداعي */}
            <fieldset className="p-5 border border-[#A7BFA8]/20 bg-[#FFF6F8]/30 rounded-xl">
              <legend className="px-3 text-sm font-semibold text-[#3A3A3A] bg-[#A7BFA8]/20 rounded-md border border-[#A7BFA8]/30 py-1 mb-2">بيانات المُضيف (الداعي)</legend>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">الاسم</label>
                  <input name="hostName" value={formData.hostName} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] text-[#3A3A3A]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">صلة القرابة</label>
                  <input name="hostRelation" placeholder="مثال: والد العريس، أخ العروس" value={formData.hostRelation} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] text-[#3A3A3A]" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#8A8A8A]">رقم التواصل (للاستفسار)</label>
                <input name="contactNumber" dir="ltr" pattern="[\+\- \(\)0-9]*" placeholder="+966 5X XXX XXXX" value={formData.contactNumber} onChange={handlePhoneChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-[#A7BFA8]/50 focus:border-[#A7BFA8] text-[#3A3A3A] text-left font-mono" />
              </div>
            </fieldset>

            {/* الضيف */}
            <fieldset className="p-5 border border-[#C6A9C8]/30 bg-[#FFF6F8]/30 rounded-xl relative overflow-hidden">
              {/* Highlight badge for AI customization */}
              <div className="absolute top-0 left-0 bg-[#C6A9C8]/20 text-[#3A3A3A] text-xs px-3 py-1 rounded-br-xl font-bold flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#C6A9C8]"/> تخصيص الذكاء الاصطناعي</div>
              
              <legend className="px-3 text-sm font-semibold text-[#3A3A3A] bg-[#C6A9C8]/20 rounded-md border border-[#C6A9C8]/30 py-1 mb-2">تخصيص الدعوة للضيف</legend>
              <div className="grid grid-cols-2 gap-5 mb-5 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">اسم المدعو</label>
                  <input name="guestName" value={formData.guestName} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-[#C6A9C8]/50 focus:border-[#C6A9C8] text-[#3A3A3A]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">العمر التقريبي</label>
                  <input name="guestAge" type="number" value={formData.guestAge} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-[#C6A9C8]/50 focus:border-[#C6A9C8] text-[#3A3A3A]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">العلاقة بالضيف (مدير، صديق، عم...)</label>
                  <input name="guestRelation" value={formData.guestRelation} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-[#C6A9C8]/50 focus:border-[#C6A9C8] text-[#3A3A3A]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#8A8A8A]">شخصية أو طابع الضيف</label>
                  <input name="guestPersonality" placeholder="رسمي، فكاهي المستحيل..." value={formData.guestPersonality} onChange={handleChange} className="w-full bg-white border border-[#A7BFA8]/40 rounded-lg px-4 py-2.5 outline-none transition shadow-sm focus:ring-2 focus:ring-[#C6A9C8]/50 focus:border-[#C6A9C8] text-[#3A3A3A]" />
                  <p className="text-xs text-[#8A8A8A]">هذا سيغير نبرة التوليد (Tone)</p>
                </div>
              </div>
            </fieldset>

            {/* التصميم والخلفيات */}
            <fieldset className="p-5 border border-[#E7A7B5]/20 bg-[#FFF6F8]/30 rounded-xl">
              <legend className="px-3 text-sm font-semibold text-[#3A3A3A] bg-[#E7A7B5]/20 rounded-md border border-[#E7A7B5]/30 py-1 mb-2">التصميم والمظهر</legend>
              
              <div className="space-y-6">
                {/* Custom Background Image */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-[#8A8A8A] flex items-center gap-1.5"><Upload className="w-4 h-4 text-[#A7BFA8]" /> مظهر الخلفية</label>
                    <button
                      type="button"
                      onClick={handleGenerateDesign}
                      disabled={isDesigning}
                      className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-[#E7A7B5]/10 text-[#E7A7B5] hover:bg-[#E7A7B5]/20 rounded-full transition-all font-bold border border-[#E7A7B5]/20 disabled:opacity-50"
                    >
                      {isDesigning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                      ابتكار تصميم ذكي (AI Art)
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {formData.backgroundImage ? (
                      <div className="flex items-center gap-3 bg-white border border-[#A7BFA8]/30 rounded-lg p-2 pr-4 shadow-sm">
                        <img src={formData.backgroundImage} alt="Preview" className="w-10 h-10 object-cover rounded-md border border-neutral-100" />
                        <span className="text-sm text-[#3A3A3A] flex-1 truncate">تم إرفاق صورة مخصصة (تُخفي الزخارف الافتراضية)</span>
                        <button type="button" onClick={removeImage} className="p-2 hover:bg-[#FFF6F8] text-[#E7A7B5] rounded-md transition"><X className="w-4 h-4" /></button>
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
                        <div className="w-full bg-white border border-dashed border-[#A7BFA8]/60 rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-2 text-[#8A8A8A] hover:bg-[#FFF6F8]/50 hover:border-[#E7A7B5] transition">
                          <Upload className="w-6 h-6 text-[#A7BFA8]" />
                          <span className="text-sm font-medium">اضغط هنا أو اسحب الصورة لرفعها</span>
                          <span className="text-xs text-[#8A8A8A]/70">ستظهر الصورة كخلفية بدلاً من الألوان الافتراضية للنمط</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual Style */}
                <div className="space-y-3 border-t border-[#A7BFA8]/20 pt-4">
                  <label className="text-sm font-semibold text-[#8A8A8A] flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-[#A7BFA8]" /> النمط البصري (للعرض والكلمات الدليلية)</label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {STYLES.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormData({...formData, style: s.id})}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          formData.style === s.id 
                            ? 'border-[#E7A7B5] bg-[#E7A7B5] text-white shadow-md' 
                            : 'border-[#A7BFA8]/30 bg-white hover:border-[#E7A7B5]/50 hover:bg-[#FFF6F8] text-[#3A3A3A]'
                        }`}
                      >
                        <div className="font-semibold text-[13px]">{s.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selection */}
                <div className="space-y-3 border-t border-[#A7BFA8]/20 pt-4">
                  <label className="text-sm font-semibold text-[#8A8A8A] flex items-center gap-1.5"><Type className="w-4 h-4 text-[#A7BFA8]" /> نوع الخط العَربي الأساسي</label>
                  <div className="grid grid-cols-3 gap-3">
                    {FONTS.map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormData({...formData, fontFamily: f.id})}
                        className={`p-2.5 rounded-lg border text-center transition-all ${f.id} ${
                          formData.fontFamily === f.id || (!formData.fontFamily && f.id === 'font-amiri')
                            ? 'border-[#E7A7B5] bg-[#E7A7B5]/10 text-[#3A3A3A] ring-1 ring-[#E7A7B5]' 
                            : 'border-[#A7BFA8]/30 bg-white hover:border-[#E7A7B5]/50 hover:bg-[#FFF6F8] text-[#8A8A8A]'
                        }`}
                      >
                        <div className="font-medium text-base">{f.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </fieldset>
            
          </form>
          
          <div className="pt-6 mt-6 border-t border-[#A7BFA8]/20 sticky bottom-0 bg-white pb-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-[#E7A7B5] hover:bg-[#d696a4] focus:ring-4 focus:ring-[#E7A7B5]/30 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-70 shadow-md shadow-[#E7A7B5]/30"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isGenerating ? 'جاري الصياغة...' : 'توليد نَص الدعوة بالذكاء الاصطناعي'}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="md:col-span-1 flex flex-col gap-6 md:h-[calc(100vh-4rem)]">
          <div className="bg-transparent flex items-center justify-center relative w-full overflow-y-auto lg:p-0 flex-1 custom-scrollbar">
             <div ref={cardRef} className="w-full">
               <PreviewCard data={formData} text={generatedText} isGenerating={isGenerating} />
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#A7BFA8]/30 p-5 flex flex-col gap-4">
             <button
               onClick={downloadImage}
               disabled={isDownloading}
               className="w-full bg-[#1e293b] hover:bg-[#334155] focus:ring-4 focus:ring-slate-300 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-70 shadow-md"
             >
               {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
               تحميل الدعوة كصورة (JPG)
             </button>
             
             {formData.locationLink && (
               <a 
                 href={formData.locationLink} 
                 target="_blank" 
                 rel="noreferrer"
                 className="w-full bg-[#A7BFA8] hover:bg-[#91aa92] focus:ring-4 focus:ring-[#A7BFA8]/30 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
               >
                 <MapPin className="w-5 h-5" />
                 رابط خرائط جوجل (Google Maps)
               </a>
             )}
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
  } else if (data.style === 'eternal-blossom') {
    containerClasses += "bg-[#fffcf7]";
    textClasses += "text-[#6e4e5e]";
  } else if (data.style === 'classic-gold') {
    containerClasses += "bg-white border-4 border-double border-[#d4af37]";
    textClasses += "text-[#d4af37]";
  } else if (data.style === 'royal') {
    containerClasses += "bg-[#111c2e]";
    textClasses += "text-[#e5c158]";
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
          {data.style === 'eternal-blossom' && (
            <motion.div key="eternal-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 pointer-events-none overflow-hidden">
               <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#d4af37]/60 rounded-tr-xl" />
               <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#d4af37]/60 rounded-tl-xl" />
               <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#d4af37]/60 rounded-br-xl" />
               <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#d4af37]/60 rounded-bl-xl" />
               {/* Watercolor blobs for couple and flowers */}
               <div className="absolute bottom-0 left-0 w-64 h-96 bg-gradient-to-tr from-rose-100/40 via-transparent to-transparent blur-3xl" />
               <div className="absolute bottom-12 left-12 w-32 h-64 bg-neutral-200/40 rounded-t-full blur-3xl rotate-12" />
               {/* Blossoms */}
               <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-rose-200/60 rounded-full blur-xl" />
               <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-rose-100/50 rounded-full blur-2xl shadow-inner" />
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
             
             {(data.date || data.time) && (
               <div className="flex justify-center gap-4">
                 {data.date && (
                   <div className="flex items-center gap-1 opacity-80 flex-row-reverse" dir="ltr">
                     <span className={`${data.style === 'botanical-circle' ? 'text-xs' : ''}`}>{data.date}</span>
                     <Calendar className={`${data.style === 'botanical-circle' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                   </div>
                 )}
                 {data.time && (
                   <div className="flex items-center gap-1 opacity-80 flex-row-reverse" dir="ltr">
                     <span className={`${data.style === 'botanical-circle' ? 'text-xs' : ''}`}>{data.time}</span>
                     <Clock className={`${data.style === 'botanical-circle' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                   </div>
                 )}
               </div>
             )}

             <div className="flex justify-center gap-5 mt-1">
                {/* 
                <a href={data.locationLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 opacity-80 hover:opacity-100 flex-row-reverse">
                   <LinkIcon className={`${data.style === 'botanical-circle' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                   <span className="underline underline-offset-4 decoration-current/30">الموقع</span>
                </a>
                */}
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

