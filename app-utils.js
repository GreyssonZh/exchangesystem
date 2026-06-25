(function (global) {
  function normalizeReceipt(value) {
    return String(value || "").trim().replace(/^#/, "");
  }

  function filterHistory(history, filters = {}) {
    const dateFilter = String(filters.date || "").trim();
    const receiptFilter = normalizeReceipt(filters.receiptNumber);

    return history.filter((item) => {
      const matchesDate = !dateFilter || item.date === dateFilter;
      const matchesReceipt = !receiptFilter || String(item.receiptNumber).includes(receiptFilter) || String(item.receiptNumber).padStart(6, "0").includes(receiptFilter);
      return matchesDate && matchesReceipt;
    });
  }

  function calculateStats(history) {
    const today = new Date().toISOString().slice(0, 10);
    const monthPrefix = new Date().toISOString().slice(0, 7);

    const totals = {
      today: {},
      month: {}
    };

    const addAmount = (bucket, item) => {
      const currency = item.to;
      const existing = totals[bucket][currency] || 0;
      totals[bucket][currency] = existing + Number(item.outputAmount || 0);
    };

    history.forEach((item) => {
      if (item.date === today) {
        addAmount("today", item);
      }
      if (String(item.date).startsWith(monthPrefix)) {
        addAmount("month", item);
      }
    });

    return {
      today: {
        count: history.filter((item) => item.date === today).length,
        totals: totals.today
      },
      month: {
        count: history.filter((item) => String(item.date).startsWith(monthPrefix)).length,
        totals: totals.month
      }
    };
  }

  global.ExchangeUtils = {
    filterHistory,
    calculateStats
  };
})(window);
