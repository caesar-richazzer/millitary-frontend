import React, { useState } from 'react';

export default function EditOfficerModal({ officer, onClose, onSave, onAddInfraction }) {
  const [activeTab, setActiveTab] = useState('EDIT_BIO');
  const isNew = !officer;

  const [photoPreview, setPhotoPreview] = useState(officer?.profile_photo || null);
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    p_service_number: officer?.p_service_number || '',
    nida_number: officer?.nida_number || '',
    first_name: officer?.first_name || '',
    middle_name: officer?.middle_name || '',
    last_name: officer?.last_name || '',
    gender: officer?.gender || 'M',
    date_of_birth: officer?.date_of_birth || '',
    phone_number: officer?.phone_number || '',
    blood_group: officer?.blood_group || 'O+',
    rank: officer?.rank || 'Luteni (Lieutenant)',
    commission_type: officer?.commission_type || 'REGULAR',
    department: officer?.department || '834KJ-BHQ',
    primary_appointment: officer?.primary_appointment || '',
    housing_quarters: officer?.housing_quarters || '',
    security_clearance: officer?.security_clearance || 'CONFIDENTIAL',
    duty_status: officer?.duty_status || 'ACTIVE',
    military_qualifications: officer?.military_qualifications || '',
    region_of_origin: officer?.region_of_origin || '',
    district_of_origin: officer?.district_of_origin || '',
    ward: officer?.ward || '',
    street_village: officer?.street_village || '',
    ten_cell_leader: officer?.ten_cell_leader || '',
    ten_cell_phone: officer?.ten_cell_phone || '',
    father_name: officer?.father_name || '',
    mother_name: officer?.mother_name || '',
    next_of_kin_name: officer?.next_of_kin_name || '',
    next_of_kin_phone: officer?.next_of_kin_phone || '',
    relationship: officer?.relationship || 'Spouse (Mke)',
  });

  const [infractionData, setInfractionData] = useState({
    category: 'FIGHTING',
    title: '',
    details: '',
    punishment_assigned: '',
    date_incident: new Date().toISOString().split('T')[0],
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleBioSubmit = (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      formPayload.append(key, formData[key]);
    });
    if (photoFile) {
      formPayload.append('profile_photo', photoFile);
    }
    onSave(officer?.id || null, formPayload);
  };

  const handleInfractionSubmit = (e) => {
    e.preventDefault();
    if (officer?.id) onAddInfraction(officer.id, infractionData);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99999] flex justify-center items-center p-4">
      <div className="bg-[#0F1521] border border-emerald-500/30 text-slate-200 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden font-sans">
        
        <div className="p-6 border-b border-emerald-500/20 flex justify-between items-center bg-slate-900/60">
          <div>
            <h2 className="text-lg font-bold text-white">
              {isNew ? 'Register New Officer' : `Officer File: ${officer?.p_service_number}`}
            </h2>
            <p className="text-xs text-slate-400 font-medium">Fill in essential military details below</p>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer border border-slate-700"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="flex p-2 bg-slate-900/80 border-b border-emerald-500/20">
          <button
            type="button"
            onClick={() => setActiveTab('EDIT_BIO')}
            className={`flex-1 py-2 text-xs font-semibold rounded-2xl transition-all ${
              activeTab === 'EDIT_BIO' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isNew ? 'New Registration' : 'Edit Officer Details'}
          </button>
          {!isNew && (
            <button
              type="button"
              onClick={() => setActiveTab('ADD_INFRACTION')}
              className={`flex-1 py-2 text-xs font-semibold rounded-2xl transition-all ${
                activeTab === 'ADD_INFRACTION' ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Log Incident
            </button>
          )}
        </div>

        {activeTab === 'EDIT_BIO' && (
          <form onSubmit={handleBioSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <i className="bi bi-person-badge-fill"></i> 1. Basic Information & Profile Photo
              </h3>

              <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-2xl border border-emerald-500/20">
                <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 overflow-hidden flex items-center justify-center shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Officer" className="w-full h-full object-cover" />
                  ) : (
                    <i className="bi bi-person-bounding-box text-3xl text-slate-500"></i>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Upload Official Photo
                  </label>
                  <input 
                    type="file" accept="image/*" onChange={handlePhotoChange}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">P-Number* (Max 20)</label>
                  <input 
                    type="text" placeholder="e.g. P-10928" value={formData.p_service_number}
                    maxLength={20}
                    onChange={(e) => setFormData({ ...formData, p_service_number: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-emerald-400 font-bold rounded-2xl uppercase focus:outline-none focus:border-emerald-400" required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">NIDA Number* (20 Digits)</label>
                  <input 
                    type="text" 
                    placeholder="20 Digits NIDA" 
                    value={formData.nida_number}
                    maxLength={20}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setFormData({ ...formData, nida_number: val });
                    }}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400 font-mono" required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">First Name*</label>
                  <input 
                    type="text" placeholder="First Name" value={formData.first_name}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400" required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Middle Name</label>
                  <input 
                    type="text" placeholder="Middle Name" value={formData.middle_name}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Last Name*</label>
                  <input 
                    type="text" placeholder="Last Name" value={formData.last_name}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400" required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gender</label>
                  <select 
                    value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400"
                  >
                    <option value="M" className="bg-slate-900">Male</option>
                    <option value="F" className="bg-slate-900">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2: MILITARY DETAILS */}
            <div className="space-y-3 pt-3 border-t border-emerald-500/20">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <i className="bi bi-award-fill"></i> 2. Military Rank & Command Details
              </h3>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Rank (Cheo)*</label>
                  <select 
                    value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400" required
                  >
                    <optgroup label="Commissioned Officers" className="bg-slate-900 text-emerald-400">
                      <option value="Kanali (Colonel)" className="bg-slate-900 text-white">Kanali (Colonel)</option>
                      <option value="Luteni Kanali (Lt. Colonel)" className="bg-slate-900 text-white">Luteni Kanali (Lt. Colonel)</option>
                      <option value="Meja (Major)" className="bg-slate-900 text-white">Meja (Major)</option>
                      <option value="Kapteni (Captain)" className="bg-slate-900 text-white">Kapteni (Captain)</option>
                      <option value="Luteni (Lieutenant)" className="bg-slate-900 text-white">Luteni (Lieutenant)</option>
                      <option value="Luteni wa Pili (2nd Lieutenant)" className="bg-slate-900 text-white">Luteni wa Pili (2nd Lieutenant)</option>
                    </optgroup>
                    <optgroup label="Non-Commissioned Officers (NCOs)" className="bg-slate-900 text-emerald-400">
                      <option value="Afisa Wara I (Warrant Officer I)" className="bg-slate-900 text-white">Afisa Wara I (Warrant Officer I)</option>
                      <option value="Afisa Wara II (Warrant Officer II)" className="bg-slate-900 text-white">Afisa Wara II (Warrant Officer II)</option>
                      <option value="Sajenti wa Platuani (Staff Sergeant)" className="bg-slate-900 text-white">Sajenti wa Platuani (Staff Sergeant)</option>
                      <option value="Sajenti (Sergeant)" className="bg-slate-900 text-white">Sajenti (Sergeant)</option>
                      <option value="Koplo (Corporal)" className="bg-slate-900 text-white">Koplo (Corporal)</option>
                    </optgroup>
                    <optgroup label="Enlisted Staff" className="bg-slate-900 text-emerald-400">
                      <option value="Askari (Private)" className="bg-slate-900 text-white">Askari (Private)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department (Tawi)*</label>
                  <select 
                    value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400" required
                  >
                    <option value="834KJ-BHQ" className="bg-slate-900">834KJ-BHQ</option>
                    <option value="8934KJ-ADMINI" className="bg-slate-900">8934KJ-ADMINI</option>
                    <option value="834KJ-IO" className="bg-slate-900">834KJ-IO</option>
                    <option value="834KJ-QM-tawi la siliha" className="bg-slate-900">834KJ-QM-tawi la siliha</option>
                    <option value="834KJ-ZAHANATI" className="bg-slate-900">834KJ-ZAHANATI</option>
                    <option value="834KJ-UDM" className="bg-slate-900">834KJ-UDM</option>
                    <option value="834KJ-RADIO OPERATOR" className="bg-slate-900">834KJ-RADIO OPERATOR</option>
                    <option value="834KJ-mafunzo" className="bg-slate-900">834KJ-mafunzo</option>
                    <option value="834KJ-O/MESS & INSTIUTES" className="bg-slate-900">834KJ-O/MESS & INSTIUTES</option>
                    <option value="834KJ-VETA" className="bg-slate-900">834KJ-VETA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Security Clearance</label>
                  <select 
                    value={formData.security_clearance} onChange={(e) => setFormData({ ...formData, security_clearance: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400"
                  >
                    <option value="RESTRICTED" className="bg-slate-900">Restricted (Kawaida)</option>
                    <option value="CONFIDENTIAL" className="bg-slate-900">Confidential (Siri)</option>
                    <option value="TOP_SECRET" className="bg-slate-900">Top Secret (Siri Kubwa)</option>
                    <option value="COMMAND" className="bg-slate-900">Command High Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Appointment</label>
                  <input 
                    type="text" placeholder="e.g. Mkufunzi Mkuu" value={formData.primary_appointment}
                    maxLength={100}
                    onChange={(e) => setFormData({ ...formData, primary_appointment: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Housing Quarters</label>
                  <input 
                    type="text" placeholder="e.g. SOM Room 04" value={formData.housing_quarters}
                    maxLength={100}
                    onChange={(e) => setFormData({ ...formData, housing_quarters: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: GRASSROOTS ORIGIN */}
            <div className="space-y-3 pt-3 border-t border-emerald-500/20">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <i className="bi bi-[#1E293B] bi-house-door-fill"></i> 3. Address & Grassroots Origin (Nyumba 10)
              </h3>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Region Origin</label>
                  <input 
                    type="text" placeholder="Region" value={formData.region_of_origin}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, region_of_origin: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">District</label>
                  <input 
                    type="text" placeholder="District" value={formData.district_of_origin}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, district_of_origin: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ward (Kata)</label>
                  <input 
                    type="text" placeholder="Ward" value={formData.ward}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Street / Village</label>
                  <input 
                    type="text" placeholder="Street" value={formData.street_village}
                    maxLength={100}
                    onChange={(e) => setFormData({ ...formData, street_village: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ten-Cell Leader (Balozi)</label>
                  <input 
                    type="text" placeholder="Jina la Balozi" value={formData.ten_cell_leader}
                    maxLength={100}
                    onChange={(e) => setFormData({ ...formData, ten_cell_leader: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Balozi Phone</label>
                  <input 
                    type="text" placeholder="+255 7XX XXX XXX" value={formData.ten_cell_phone}
                    maxLength={20}
                    onChange={(e) => setFormData({ ...formData, ten_cell_phone: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: FAMILY & NEXT OF KIN */}
            <div className="space-y-3 pt-3 border-t border-emerald-500/20">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <i className="bi bi-people-fill"></i> 4. Family & Next of Kin
              </h3>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Father's Name (Baba)</label>
                  <input 
                    type="text" placeholder="Father Name" value={formData.father_name}
                    maxLength={100}
                    onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mother's Name (Mama)</label>
                  <input 
                    type="text" placeholder="Mother Name" value={formData.mother_name}
                    maxLength={100}
                    onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Next of Kin Name</label>
                  <input 
                    type="text" placeholder="Beneficiary Name" value={formData.next_of_kin_name}
                    maxLength={100}
                    onChange={(e) => setFormData({ ...formData, next_of_kin_name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Relationship</label>
                  <input 
                    type="text" placeholder="e.g. Spouse (Mke)" value={formData.relationship}
                    maxLength={50}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Next of Kin Phone</label>
                  <input 
                    type="text" placeholder="+255 7XX XXX XXX" value={formData.next_of_kin_phone}
                    maxLength={20}
                    onChange={(e) => setFormData({ ...formData, next_of_kin_phone: e.target.value })}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: QUALIFICATIONS */}
            <div className="space-y-3 pt-3 border-t border-emerald-500/20">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <i className="bi bi-mortarboard-fill"></i> 5. Military Qualifications & Courses
              </h3>

              <div className="text-xs">
                <textarea 
                  rows={2}
                  placeholder="e.g. Command & Staff College, Airborne Course, Cyber Defense Training..."
                  value={formData.military_qualifications}
                  maxLength={500}
                  onChange={(e) => setFormData({ ...formData, military_qualifications: e.target.value })}
                  className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-2xl text-xs tracking-wide transition-all shadow-lg shadow-emerald-500/30 cursor-pointer flex items-center justify-center gap-2"
            >
              <i className="bi bi-floppy-fill"></i> {isNew ? 'Save Complete Officer Record (Django DB)' : 'Update Officer Record'}
            </button>

          </form>
        )}

        {/* INFRACTION FORM */}
        {activeTab === 'ADD_INFRACTION' && (
          <form onSubmit={handleInfractionSubmit} className="p-6 space-y-4">
            <div className="text-xs space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select 
                  value={infractionData.category} onChange={(e) => setInfractionData({ ...infractionData, category: e.target.value })}
                  className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl"
                >
                  <option value="FIGHTING" className="bg-slate-900">Kupigana (Fighting)</option>
                  <option value="THEFT" className="bg-slate-900">Wizi (Theft)</option>
                  <option value="INSUBORDINATION" className="bg-slate-900">Dharau kwa Afisa</option>
                  <option value="OTHER" className="bg-slate-900">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Incident Title</label>
                <input 
                  type="text" placeholder="Short summary..." value={infractionData.title} 
                  maxLength={150}
                  onChange={(e) => setInfractionData({ ...infractionData, title: e.target.value })}
                  className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl" required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Punishment Assigned</label>
                <input 
                  type="text" placeholder="Penalty description..." value={infractionData.punishment_assigned} 
                  maxLength={150}
                  onChange={(e) => setInfractionData({ ...infractionData, punishment_assigned: e.target.value })}
                  className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl" required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-2xl text-xs tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <i className="bi bi-exclamation-triangle-fill"></i> Log Disciplinary Incident
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
