const ProfileSidebar = () => {








return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#156082] to-[#0d3b52] px-4">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 text-center">
      {/* Logo */}
      <div className="w-14 h-14 rounded-2xl bg-[#156082] flex items-center justify-center mx-auto mb-4">
        <span className="text-white text-2xl font-bold">D</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Daybook</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">Sign in to manage your funds</p>

      {/* Google button */}
      <div ref={buttonRef} className="flex justify-center" />

      {/* Error */}
      {error && (
        <div className="mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Footer */}
      <p className="mt-6 text-[11px] text-gray-400">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  </div>
);   }