"use client";

import React from "react";
import Link from "next/link";
import { X, Bell, CheckCheck, Ticket, Tag, Sparkles, AlertCircle, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function NotificationDrawer() {
  const {
    isNotificationDrawerOpen,
    closeNotificationDrawer,
    notifications,
    markAllAsRead,
    unreadCount,
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  const getCategoryIcon = (category) => {
    switch (category) {
      case "ticket":
        return <Ticket className="w-4 h-4 text-[#10B981]" />;
      case "promo":
        return <Tag className="w-4 h-4 text-[#FF2E63]" />;
      case "drop":
        return <Sparkles className="w-4 h-4 text-[#6366F1]" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeNotificationDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121624] border-l border-white/10 shadow-2xl flex flex-col text-[#e2e2ec] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0B0D14]/60">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-[#FF2E63]/20 border border-[#FF2E63]/30 flex items-center justify-center text-[#FF2E63]">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FF2E63] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[#121624]">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-white">
                  Notifications
                </h3>
                <span className="text-[11px] text-[#94a3b8]">
                  {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? "s" : ""}` : "All alerts caught up"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#10B981] font-semibold transition-colors cursor-pointer"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Mark read</span>
                </button>
              )}

              <button
                type="button"
                onClick={closeNotificationDrawer}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close notifications"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  notif.read
                    ? "bg-[#191b23]/50 border-white/5 opacity-80"
                    : "bg-[#191b23] border-white/15 shadow-md shadow-black/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#0c0e15] border border-white/5 shrink-0 mt-0.5">
                    {getCategoryIcon(notif.category)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-heading text-xs font-bold text-white truncate">
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#FF2E63] shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-[#94a3b8] leading-relaxed mb-2.5">
                      {notif.message}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <span className="text-[10px] text-slate-500 font-medium">
                        {notif.time}
                      </span>

                      {notif.actionLink && (
                        <Link
                          href={notif.actionLink}
                          onClick={closeNotificationDrawer}
                          className="flex items-center gap-1 text-[11px] font-bold text-[#FF2E63] hover:text-[#ff4f72] transition-colors"
                        >
                          <span>{notif.actionText || "View"}</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
                <Bell className="w-10 h-10 stroke-1 mb-2 opacity-40" />
                <p className="text-xs font-semibold">No notifications right now</p>
                <span className="text-[11px]">We&apos;ll notify you when tickets drop!</span>
              </div>
            )}
          </div>

          {/* Footer Promo Tip */}
          <div className="p-4 border-t border-white/10 bg-[#0c0e15]/80 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Want SMS & WhatsApp alerts?</span>
              <span className="text-[#10B981] font-bold">Enabled in Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

