document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Elements to update
    const phonePreview = document.getElementById('phonePreview');
    const previewTime = document.getElementById('previewTime');
    const previewNetwork = document.getElementById('previewNetwork');
    const previewBatteryPct = document.getElementById('previewBatteryPct');
    const previewBatteryIcon = document.getElementById('previewBatteryIcon');
    
    const headerAvatar = document.getElementById('headerAvatar');
    const headerName = document.getElementById('headerName');
    const headerStatus = document.getElementById('headerStatus');
    const chatBody = document.getElementById('chatBody');

    // Display Settings
    const osBtns = document.querySelectorAll('[data-setting="os"]');
    osBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            osBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const darkModeBtn = document.querySelector('[data-setting="darkMode"]');
    darkModeBtn.addEventListener('click', () => {
        darkModeBtn.classList.toggle('active');
        phonePreview.classList.toggle('dark');
    });

    const updateTime = () => {
        const val = document.getElementById('clockTime').value;
        if(!val) return;
        let [hours, minutes] = val.split(':');
        let period = 'AM';
        hours = parseInt(hours);
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) hours -= 12;
        }
        if (hours === 0) hours = 12;
        
        const isCustomStatus = document.getElementById('toggleCustomStatus') && document.getElementById('toggleCustomStatus').checked;
        const pTime = document.getElementById('previewTime');
        if(pTime) {
            if (isCustomStatus) {
                pTime.textContent = `${val}`;
            } else {
                pTime.textContent = `${hours}:${minutes} ${period.toLowerCase()}`;
            }
        }
    };

    document.getElementById('clockTime').addEventListener('input', updateTime);
    
    function setCurrentTime(inputId) {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const el = document.getElementById(inputId);
        if(el) {
            el.value = `${h}:${m}`;
            el.dispatchEvent(new Event('input'));
        }
    }
    
    document.getElementById('currentClockTimeBtn').addEventListener('click', () => setCurrentTime('clockTime'));
    document.getElementById('currentMsgTimeBtn').addEventListener('click', () => setCurrentTime('messageTime'));
    
    // Initialize default times
    setCurrentTime('clockTime');
    setCurrentTime('messageTime');
    
    // Initialize default profile pic
    document.getElementById('profileName').dispatchEvent(new Event('input'));

    const updateNetwork = () => {
        const net = document.getElementById('previewNetwork');
        if(net) net.textContent = document.getElementById('networkType').value;
    };

    document.getElementById('networkType').addEventListener('change', updateNetwork);

    // Battery
    const updateBattery = () => {
        const level = parseInt(document.getElementById('batteryLevel').value);
        const isCharging = document.getElementById('batteryCharging').classList.contains('active');
        const showPct = document.getElementById('showBatteryPercent').classList.contains('active');
        
        const isCustomStatus = document.getElementById('toggleCustomStatus') && document.getElementById('toggleCustomStatus').checked;
        
        const pBatPct = document.getElementById('previewBatteryPct');
        const pBatIcon = document.getElementById('previewBatteryIcon');

        if (pBatPct) {
            if (showPct) {
                pBatPct.textContent = isCustomStatus ? `${level}` : `${level}%`;
                pBatPct.style.display = isCustomStatus ? 'flex' : 'inline';
            } else {
                pBatPct.style.display = 'none';
            }
        }

        if (pBatIcon) {
            if (isCharging) {
                pBatIcon.className = 'fas fa-bolt';
            } else {
                if (level > 75) pBatIcon.className = 'fas fa-battery-full';
                else if (level > 50) pBatIcon.className = 'fas fa-battery-three-quarters';
                else if (level > 25) pBatIcon.className = 'fas fa-battery-half';
                else if (level > 10) pBatIcon.className = 'fas fa-battery-quarter';
                else pBatIcon.className = 'fas fa-battery-empty';
            }
        }
    };

    document.getElementById('batteryLevel').addEventListener('input', updateBattery);
    
    document.getElementById('batteryCharging').addEventListener('click', (e) => {
        e.target.classList.toggle('active');
        updateBattery();
    });
    
    document.getElementById('showBatteryPercent').addEventListener('click', (e) => {
        e.target.classList.toggle('active');
        updateBattery();
    });

    // Background Image
    document.getElementById('bgImageUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('chatBg').style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('resetBg').addEventListener('click', () => {
        document.getElementById('chatBg').style.backgroundImage = `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`;
    });

    // Theme Widgets
    document.getElementById('toggleEncryption').addEventListener('change', (e) => {
        document.getElementById('encryptionMsg').style.display = e.target.checked ? 'block' : 'none';
    });

    document.getElementById('toggleNavBar').addEventListener('change', (e) => {
        document.getElementById('bottomNavBar').style.display = e.target.checked ? 'flex' : 'none';
    });

    document.getElementById('toggleGalleryIcon').addEventListener('change', (e) => {
        const iconContainer = document.getElementById('headerIcon1');
        if (e.target.checked) {
            iconContainer.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                                  <path d="M15 7V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                  <rect x="9" y="9" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="2" />
                                  <circle cx="15" cy="13.5" r="2" fill="currentColor" />
                                  <path d="M12 21v-.5c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5v.5z" fill="currentColor" />
                                </svg>`;
        } else {
            iconContainer.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></svg>';
        }
    });

    const defaultStatusBar = `
        <div class="time" id="previewTime">12:43 pm</div>
        <div class="icons">
            <i class="fas fa-signal"></i>
            <span id="previewNetwork">5G</span>
            <span id="previewBatteryPct">50%</span>
            <i class="fas fa-battery-half" id="previewBatteryIcon"></i>
        </div>
    `;
    const customStatusBar = `
        <div class="time" id="previewTime" style="font-size: 14px; font-weight: 500; letter-spacing: 0.5px;">12:39</div>
        <div class="icons" style="display:flex; gap: 6px; align-items: center; font-size: 11px;">
            <div style="line-height: 0.9; text-align: center; font-size: 8px; font-weight: bold; margin-right: 2px; transform: scale(0.9);">0.00<br>KB/S</div>
            <i class="fas fa-wifi" style="font-size: 14px; margin-right: 2px;"></i>
            <div class="volte-box" style="margin-right: 2px;">VoLTE</div>
            <div style="display:flex; align-items:flex-end; gap: 2px;">
                <span id="previewNetwork" style="font-size: 10px; font-weight: 800; line-height:1;">4G</span>
                <div style="display:flex; align-items:flex-end; gap: 1px; height: 12px; padding-bottom: 2px;">
                    <div style="width: 2px; height: 4px; background: currentColor; border-radius:1px;"></div>
                    <div style="width: 2px; height: 6px; background: currentColor; border-radius:1px;"></div>
                    <div style="width: 2px; height: 8px; background: currentColor; border-radius:1px;"></div>
                    <div style="width: 2px; height: 10px; background: currentColor; border-radius:1px;"></div>
                </div>
            </div>
            <div style="display:flex; align-items:center; margin-left: 2px;">
                <div style="position:relative; width: 24px; height: 13px; border: 1.5px solid currentColor; border-radius: 3px; background: transparent;">
                    <span id="previewBatteryPct" style="position:absolute; inset: 0; display:flex; align-items:center; justify-content:center; font-size: 10px; font-weight: bold;">30</span>
                </div>
                <div style="width: 2px; height: 5px; background: currentColor; border-radius: 0 2px 2px 0;"></div>
            </div>
        </div>
    `;

    document.getElementById('toggleCustomStatus').addEventListener('change', (e) => {
        const statusBar = document.querySelector('.status-bar');
        if (e.target.checked) {
            statusBar.innerHTML = customStatusBar;
        } else {
            statusBar.innerHTML = defaultStatusBar;
        }
        updateTime();
        updateNetwork();
        updateBattery();
    });

    let customProfilePic = false;

    // Profile Settings
    document.getElementById('profileImageUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            customProfilePic = true;
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profileImagePreview').src = e.target.result;
                headerAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function generateAvatarDataUrl(name) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        const firstLetter = (name.trim().charAt(0) || 'N').toUpperCase();
        const charCode = firstLetter.charCodeAt(0) || 0;
        const profileColors = ['#00a884', '#005c4b', '#1d4ed8', '#7e22ce', '#be185d', '#b45309', '#0f766e', '#4338ca'];
        const color = profileColors[charCode % profileColors.length];
        
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = 'bold 64px Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2 + 5);
        
        return canvas.toDataURL('image/png');
    }

    document.getElementById('profileName').addEventListener('input', (e) => {
        const newName = e.target.value;
        headerName.textContent = newName;
        
        if (!customProfilePic) {
            const avatarUrl = generateAvatarDataUrl(newName);
            document.getElementById('profileImagePreview').src = avatarUrl;
            headerAvatar.src = avatarUrl;
        }
    });

    function formatLastSeenTime(timeStr) {
        if (!timeStr) return 'last seen today at 10:00 am';
        let [hours, minutes] = timeStr.split(':');
        let period = 'AM';
        hours = parseInt(hours);
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) hours -= 12;
        }
        if (hours === 0) hours = 12;
        return `last seen today at ${hours}:${minutes} ${period.toLowerCase()}`;
    }

    document.getElementById('profileStatus').addEventListener('change', (e) => {
        const customInputContainer = document.getElementById('customLastSeenContainer');
        const customInput = document.getElementById('customLastSeen');
        if (e.target.value === 'Offline') {
            headerStatus.style.display = 'none';
            customInputContainer.style.display = 'none';
        } else if (e.target.value === 'last seen today at 10:00 AM') {
            customInputContainer.style.display = 'block';
            headerStatus.textContent = formatLastSeenTime(customInput.value);
            headerStatus.style.display = 'block';
        } else {
            customInputContainer.style.display = 'none';
            headerStatus.textContent = e.target.value;
            headerStatus.style.display = 'block';
        }
    });

    document.getElementById('customLastSeen').addEventListener('input', (e) => {
        if (document.getElementById('profileStatus').value === 'last seen today at 10:00 AM') {
            headerStatus.textContent = formatLastSeenTime(e.target.value);
        }
    });

    // Chat Composer
    let currentSender = 'sender';
    const senderToggles = document.querySelectorAll('.sender-toggle .toggle-btn');
    const statusGroup = document.getElementById('statusGroup');
    
    senderToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            senderToggles.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSender = btn.dataset.sender;
            
            if (currentSender === 'receiver') {
                document.getElementById('messageStatus').parentElement.style.opacity = '0.5';
                document.getElementById('messageStatus').disabled = true;
            } else {
                document.getElementById('messageStatus').parentElement.style.opacity = '1';
                document.getElementById('messageStatus').disabled = false;
            }
        });
    });

    // Message Sub-tabs
    const msgTabBtns = document.querySelectorAll('.msg-tab-btn');
    const msgTabContents = document.querySelectorAll('.msg-tab-content');
    let currentMsgType = 'text'; // 'text', 'date', 'voice'

    msgTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            msgTabBtns.forEach(b => b.classList.remove('active'));
            msgTabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.dataset.msgTab;
            document.getElementById(tabId).classList.add('active');
            
            if (tabId === 'msg-text-tab') currentMsgType = 'text';
            else if (tabId === 'msg-date-tab') currentMsgType = 'date';
            else if (tabId === 'msg-voice-tab') currentMsgType = 'voice';
        });
    });

    // Image Upload Logic
    let uploadedMsgImg = null;
    document.getElementById('msgImageUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedMsgImg = e.target.result;
                document.getElementById('msgImagePreview').src = uploadedMsgImg;
                document.getElementById('msgImagePreview').style.display = 'block';
                document.getElementById('removeMsgImage').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    document.getElementById('removeMsgImage').addEventListener('click', () => {
        uploadedMsgImg = null;
        document.getElementById('msgImageUpload').value = '';
        document.getElementById('msgImagePreview').style.display = 'none';
        document.getElementById('removeMsgImage').style.display = 'none';
    });

    // Date Logic
    let selectedDate = 'Today';
    document.querySelectorAll('.date-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.date-preset').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDate = btn.dataset.date;
            if (selectedDate === 'Custom') {
                document.getElementById('customDateInput').style.display = 'block';
            } else {
                document.getElementById('customDateInput').style.display = 'none';
            }
        });
    });

    // Audio Logic
    let hasAudio = false;
    document.getElementById('audioUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            hasAudio = true;
            document.getElementById('audioFileName').textContent = file.name;
        }
    });
    // Message Actions (Edit, Delete, Swap, Move)
    function addMessageActions(element) {
        const overlay = document.createElement('div');
        overlay.className = 'msg-overlay';
        overlay.setAttribute('data-html2canvas-ignore', 'true');
        
        let swapBtn = '';
        if (element.classList.contains('message')) {
            swapBtn = `<button class="msg-action-btn swap-btn" title="Swap Sender/Receiver"><i class="fas fa-exchange-alt"></i></button>`;
        }

        overlay.innerHTML = `
            ${swapBtn}
            <button class="msg-action-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
            <button class="msg-action-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
            <button class="msg-action-btn edit-btn" title="Edit"><i class="fas fa-pen"></i></button>
            <button class="msg-action-btn delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
        `;

        overlay.querySelector('.delete-btn').addEventListener('click', () => {
            element.remove();
        });

        overlay.querySelector('.move-up-btn').addEventListener('click', () => {
            if (element.previousElementSibling) {
                element.previousElementSibling.before(element);
            }
        });

        overlay.querySelector('.move-down-btn').addEventListener('click', () => {
            if (element.nextElementSibling) {
                element.nextElementSibling.after(element);
            }
        });

        if (swapBtn) {
            overlay.querySelector('.swap-btn').addEventListener('click', () => {
                if (element.classList.contains('sent')) {
                    element.classList.remove('sent');
                    element.classList.add('received');
                    const ticks = element.querySelector('.status-ticks');
                    if (ticks) ticks.style.display = 'none';
                } else {
                    element.classList.remove('received');
                    element.classList.add('sent');
                    const ticks = element.querySelector('.status-ticks');
                    if (ticks) ticks.style.display = 'inline-block';
                }
            });
        }

        overlay.querySelector('.edit-btn').addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('fa-pen')) {
                // Enter edit mode
                icon.classList.replace('fa-pen', 'fa-check');
                btn.style.background = '#4CAF50';
                
                if (element.classList.contains('date-badge')) {
                    const span = element.querySelector('.date-text');
                    if (span) { span.contentEditable = true; span.focus(); }
                } else {
                    const textEl = element.querySelector('.msg-text');
                    if (textEl) { textEl.contentEditable = true; textEl.focus(); }
                    const timeEl = element.querySelector('.msg-time');
                    if (timeEl) timeEl.contentEditable = true;
                }
            } else {
                // Save edit mode
                icon.classList.replace('fa-check', 'fa-pen');
                btn.style.background = '';
                
                if (element.classList.contains('date-badge')) {
                    const span = element.querySelector('.date-text');
                    if (span) span.contentEditable = false;
                } else {
                    const textEl = element.querySelector('.msg-text');
                    if (textEl) textEl.contentEditable = false;
                    const timeEl = element.querySelector('.msg-time');
                    if (timeEl) timeEl.contentEditable = false;
                }
            }
        });

        element.appendChild(overlay);
    }

    // Add Message Logic
    document.getElementById('addMessageBtn').addEventListener('click', () => {
        if (currentMsgType === 'date') {
            let dText = selectedDate;
            if (selectedDate === 'Custom') {
                const cDate = document.getElementById('customDateInput').value;
                if (cDate) {
                    const d = new Date(cDate);
                    dText = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                } else {
                    return;
                }
            }
            const badge = document.createElement('div');
            badge.className = 'date-badge';
            badge.innerHTML = `<span class="date-text">${dText}</span>`;
            addMessageActions(badge);
            chatBody.appendChild(badge);
            chatBody.scrollTop = chatBody.scrollHeight;
            return;
        }

        const timeVal = document.getElementById('messageTime').value;
        if(!timeVal) return;
        let [hours, minutes] = timeVal.split(':');
        let period = 'AM';
        
        hours = parseInt(hours);
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) hours -= 12;
        }
        if (hours === 0) hours = 12;
        const formattedTime = `${hours}:${minutes} ${period.toLowerCase()}`;

        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${currentSender === 'sender' ? 'sent' : 'received'}`;
        
        let statusHtml = '';
        if (currentSender === 'sender') {
            const status = document.getElementById('messageStatus').value;
            let svgContent = '';
            
            if (status === 'waiting') {
                svgContent = '<svg viewBox="0 0 16 15" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 8.313a.627.627 0 0 1-.438.188H5.938a.617.617 0 0 1-.625-.625V4.313a.617.617 0 0 1 .625-.625.617.617 0 0 1 .625.625V7.25h2.75c.344 0 .625.281.625.625 0 .172-.063.328-.188.438zM8 1.625c-3.234 0-5.875 2.641-5.875 5.875S4.766 13.375 8 13.375 13.875 10.734 13.875 7.5 11.234 1.625 8 1.625zM8 .375c3.938 0 7.125 3.188 7.125 7.125S11.938 14.625 8 14.625.875 11.438.875 7.5 4.063.375 8 .375z" fill="#8696a0"/></svg>';
            } else if (status === 'sent') {
                svgContent = '<svg viewBox="0 0 16 15" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#8696a0"/></svg>';
            } else if (status === 'delivered') {
                svgContent = '<svg viewBox="0 0 16 15" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#8696a0"/></svg>';
            } else if (status === 'read') {
                svgContent = '<svg viewBox="0 0 16 15" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#53bdeb"/></svg>';
            }
            
            statusHtml = `<span class="status-ticks">${svgContent}</span>`;
        }

        let reactionHtml = '';
        const rx = document.getElementById('messageReaction').value;
        if (rx) {
            reactionHtml = `<div class="reaction-badge">${rx}</div>`;
        }

        if (currentMsgType === 'voice') {
            const len = document.getElementById('audioLength').value || 5;
            msgDiv.innerHTML = `
                <div class="msg-audio-content">
                    <i class="fas fa-play" style="background:var(--primary); color:white; padding:8px; border-radius:50%; font-size:12px; margin-right:5px; margin-left: 5px;"></i>
                    <div style="flex:1; height:4px; background:var(--primary); border-radius:2px; position:relative;">
                         <div style="width:8px; height:8px; background:var(--primary); border-radius:50%; position:absolute; top:-2px; left:0;"></div>
                    </div>
                    <span style="font-size:12px; font-weight:600; margin-left:10px;">0:${len.toString().padStart(2, '0')}</span>
                    <img src="https://ui-avatars.com/api/?name=name&background=random&size=30" style="border-radius:50%; margin-left:5px;">
                </div>
                <div class="msg-meta">
                    <span class="msg-time">${formattedTime}</span>
                    ${statusHtml}
                </div>
                ${reactionHtml}
            `;
            // Reset
            document.getElementById('audioUpload').value = '';
            document.getElementById('audioFileName').textContent = '';
            hasAudio = false;
        } else {
            const text = document.getElementById('messageInput').value;
            let contentHtml = '';
            if (uploadedMsgImg) {
                contentHtml += `<img src="${uploadedMsgImg}" class="msg-image-content">`;
            }
            if (text.trim()) {
                contentHtml += `<div class="msg-text">${text.replace(/\\n/g, '<br>')} <span style="display:inline-block; width:65px; height:10px;"></span></div>`;
            } else if (!uploadedMsgImg) {
                return; // empty text and no image
            }

            msgDiv.innerHTML = `
                ${contentHtml}
                <div class="msg-meta">
                    <span class="msg-time">${formattedTime}</span>
                    ${statusHtml}
                </div>
                ${reactionHtml}
            `;
            document.getElementById('messageInput').value = '';
        }
        
        addMessageActions(msgDiv);
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    document.getElementById('clearChatBtn').addEventListener('click', () => {
        if (confirm("Are you sure you want to clear the chat?")) {
            const messages = chatBody.querySelectorAll('.message, .date-badge');
            messages.forEach(msg => msg.remove());
        }
    });

    // Modal Logic
    const chatModal = document.getElementById('chatModal');
    const phoneWrapper = document.querySelector('.phone-wrapper');
    const modalPhoneWrapper = document.getElementById('modalPhoneWrapper');

    document.getElementById('previewModalBtn').addEventListener('click', () => {
        modalPhoneWrapper.appendChild(phonePreview);
        chatModal.classList.add('active');
    });

    document.getElementById('closeModalBtn').addEventListener('click', () => {
        phoneWrapper.appendChild(phonePreview);
        chatModal.classList.remove('active');
    });

    // Export using html2canvas
    function downloadChatImage(btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;
        
        // Ensure scrollbars don't ruin the crop
        const oldScroll = chatBody.scrollTop;
        
        html2canvas(phonePreview, {
            scale: 2, 
            useCORS: true,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'fake-whatsapp-chat.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            btn.innerHTML = originalText;
            btn.disabled = false;
        }).catch(err => {
            console.error(err);
            alert("Error generating image.");
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    }

    document.getElementById('downloadImage').addEventListener('click', function() {
        downloadChatImage(this);
    });
    
    document.getElementById('modalDownloadBtn').addEventListener('click', function() {
        downloadChatImage(this);
    });
});
