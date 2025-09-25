        {/* Chat Design Library Modal */}
        <ChatDesignLibrary 
          isOpen={isDesignLibraryOpen}
          onClose={() => setIsDesignLibraryOpen(false)}
          language={language}
        />
      </div>
    </DesignProvider>
  );
};