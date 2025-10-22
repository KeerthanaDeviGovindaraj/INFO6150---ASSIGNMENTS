$(function () {
  const pad = (n) => String(n).padStart(2, "0");
  const formatHHMMSS = (secs) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${pad(hours)}:${pad(mins)}:${pad(seconds)}`;
  };

  const isValidName = (str) => /^[A-Za-z0-9\s'\-]+$/.test(str);

  const $timerDisplay = $("#timerDisplay");
  const $eventDate = $("#eventDate");
  const $eventName = $("#eventName");
  const $dateError = $("#dateError");
  const $nameError = $("#nameError");
  const $startBtn = $("#startBtn");
  const $pauseResumeBtn = $("#pauseResumeBtn");
  const $stopSaveBtn = $("#stopSaveBtn");
  const $resetBtn = $("#resetBtn");
  const $historyList = $("#historyList");
  const $totalCount = $("#totalCount");
  const $totalTime = $("#totalTime");
  const $filterDate = $("#filterDate");
  const $clearFilter = $("#clearFilter");
  const $notification = $("#notification");
  const $modalBackdrop = $("#modalBackdrop");
  const $modalBody = $("#modalBody");
  const $modalConfirm = $("#modalConfirm");
  const $modalCancel = $("#modalCancel");

  let elapsedSeconds = 0;
  let timerIntervalId = null;
  let isRunning = false;
  let isPaused = false;
  let resolveStopPromise = null; // used to implement async stop
  const STORAGE_KEY = "event_stopwatch_sessions_v1";

  const init = () => {
    const today = new Date().toISOString().slice(0, 10);
    $eventDate.val(today);
    $filterDate.val("");

    bindEvents();
    renderHistory();
    updateDisplay();
  };

  function validateDate() {
    const val = $eventDate.val();
    if (!val) {
      $dateError.text("Please select a date").show();
      return false;
    }
    $dateError.text("").hide();
    return true;
  }

  function validateName() {
    const val = $eventName.val().trim();
    if (val.length === 0) {
      $nameError.text("Event name is required").show();
      return false;
    }
    if (val.length < 3) {
      $nameError.text("Event name must be at least 3 characters").show();
      return false;
    }
    if (val.length > 100) {
      $nameError.text("Event name too long (max 100 characters)").show();
      return false;
    }
    if (!isValidName(val)) {
      $nameError.text("Event name contains invalid characters").show();
      return false;
    }
    $nameError.text("").hide();
    return true;
  }

  function bindValidationClear() {
    $eventDate.on("focus", () => $dateError.text("").hide());
    $eventName.on("focus", () => $nameError.text("").hide());
  }

  function startIntervalUpdater() {
    if (timerIntervalId) clearInterval(timerIntervalId);
    timerIntervalId = setInterval(() => {
      if (isRunning && !isPaused) {
        elapsedSeconds++;
        updateDisplay();
      }
    }, 1000);
  }

  function stopIntervalUpdater() {
    if (timerIntervalId) { clearInterval(timerIntervalId); timerIntervalId = null; }
  }

 
  function startTimer() {
    return new Promise((resolve) => {
      isRunning = true;
      isPaused = false;
      startIntervalUpdater();
      resolveStopPromise = resolve;
    });
  }

  function stopTimer() {
    isRunning = false;
    isPaused = false;
    stopIntervalUpdater();
    if (typeof resolveStopPromise === "function") {
      resolveStopPromise(elapsedSeconds);
      resolveStopPromise = null;
    }
  }

  function togglePauseResume() {
    if (!isRunning) return;
    isPaused = !isPaused;
  }


  function updateDisplay() {
    $timerDisplay.text(formatHHMMSS(elapsedSeconds));
  }

  function setFormDisabled(disabled) {
    $eventDate.prop("disabled", disabled);
    $eventName.prop("disabled", disabled);
    $startBtn.prop("disabled", disabled);
  }

  function showNotification(message, duration = 2200) {
    $notification.text(message).removeClass("hidden");
    setTimeout(() => {
      $notification.addClass("hidden");
    }, duration);
  }


  const loadSessions = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  };

  const saveSessions = (sessions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  };


  function renderHistory() {
    const sessions = loadSessions().sort((a, b) => b.savedAt - a.savedAt);
    const filterVal = $filterDate.val();

    let filtered = sessions;
    if (filterVal) {
      filtered = sessions.filter((s) => s.date === filterVal);
    }

    $historyList.empty();

    if (!filtered.length) {
      $historyList.append(`<div class="empty">No sessions recorded yet</div>`);
    } else {
      filtered.forEach((s) => {
        const $item = $(`
          <div class="history-item" data-id="${s.id}">
            <div class="left">
              <div class="session-meta">
                <div class="meta-date">${s.date}</div>
                <div class="meta-name" title="${escapeHtml(s.name)}">${escapeHtml(s.name)}</div>
              </div>
            </div>
            <div class="session-duration">${formatHHMMSS(s.duration)}</div>
          </div>
        `);
        $historyList.append($item);
      });
    }

    const totalSessions = sessions.length;
    const totalSeconds = sessions.reduce((acc, cur) => acc + (Number(cur.duration) || 0), 0);
    $totalCount.text(totalSessions);
    $totalTime.text(formatHHMMSS(totalSeconds));
  }

  function escapeHtml(unsafe) {
    return String(unsafe).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  function bindEvents() {
    bindValidationClear();

    $eventName.on("input blur", () => validateName());
    $eventDate.on("change blur", () => validateDate());


    $startBtn.on("click", async () => {
      $dateError.text("").hide();
      $nameError.text("").hide();

      const validDate = validateDate();
      const validName = validateName();
      if (!validDate || !validName) return;


      setFormDisabled(true);
      $pauseResumeBtn.prop("disabled", false).text("Pause");
      $stopSaveBtn.prop("disabled", false); 
      await startTimer(); 
      
    });


    $pauseResumeBtn.on("click", function () {
      if (!isRunning) return;
      togglePauseResume();
      $(this).text(isPaused ? "Resume" : "Pause");
    });


    $stopSaveBtn.on("click", function () {
      if (!isRunning) return;

      const name = $eventName.val().trim();
      const date = $eventDate.val();
      const durationStr = formatHHMMSS(elapsedSeconds);
      $modalBody.text(`Save the session "${name}" on ${date} (${durationStr})?`);
      $modalBackdrop.removeClass("hidden").attr("aria-hidden", "false");
    });


    $modalCancel.on("click", () => {
      $modalBackdrop.addClass("hidden").attr("aria-hidden", "true");
    });


    $modalConfirm.on("click", async () => {
      $modalBackdrop.addClass("hidden").attr("aria-hidden", "true");


      stopTimer(); 
      const finalSecs = elapsedSeconds;

  
      const session = {
        id: Date.now() + "-" + Math.random().toString(36).slice(2, 8),
        date: $eventDate.val(),
        name: $eventName.val().trim(),
        duration: finalSecs,
        savedAt: Date.now()
      };

      
      await (async () => {
        const sessions = loadSessions();
        sessions.push(session);
        saveSessions(sessions);
        return Promise.resolve();
      })();


      showNotification("Session saved");

      elapsedSeconds = 0;
      updateDisplay();
      isRunning = false;
      isPaused = false;
      stopIntervalUpdater();
      $pauseResumeBtn.prop("disabled", true).text("Pause");
      $stopSaveBtn.prop("disabled", true);
      setFormDisabled(false);
      renderHistory();
    });

    $resetBtn.on("click", function () {
      stopTimer();
      elapsedSeconds = 0;
      updateDisplay();
      isRunning = false;
      isPaused = false;
      $pauseResumeBtn.prop("disabled", true).text("Pause");
      $stopSaveBtn.prop("disabled", true);
      setFormDisabled(false);
    });

    $filterDate.on("change", function () {
      renderHistory();
    });

    $clearFilter.on("click", function () {
      $filterDate.val("");
      renderHistory();
    });

  
    $eventName.on("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        $startBtn.trigger("click");
      }
    });

    $historyList.on("click", ".history-item", function () {
      const id = $(this).data("id");
      const sessions = loadSessions();
      const s = sessions.find((x) => x.id === id);
      if (s) {
        navigator.clipboard?.writeText(`${s.date} - ${s.name} - ${formatHHMMSS(s.duration)}`)
          .then(() => showNotification("Copied session to clipboard"))
          .catch(() => {/* ignore */});
      }
    });
  }

  init();
});
