import React from "react";
import { signInWithGooglePopup } from "../../services/firebase";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Google } from "@mui/icons-material";
import business_logo from "../../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import google from "../../assets/google.svg"; // Assuming you have a Google icon in your assets


const Register = ({ isOpen, onClose }) => {
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      // No need to call onClose here as the auth state change will handle it
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with animation */}
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.30)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal with animation */}
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Close Button with hover animation */}
            <motion.button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <XMarkIcon className="h-6 w-6" />
            </motion.button>

            {/* Modal content */}
            <div className="p-8">
              <motion.div
                className="flex justify-center mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <img
                  src={business_logo}
                  alt="Jeff Software Solutions Logo"
                  className="h-12"
                />
              </motion.div>

              <motion.h2
                className="text-2xl font-bold text-center text-gray-800 mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                Sign In
              </motion.h2>

              {/* <motion.button
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                onClick={handleSignInWithGoogle}
                whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Google className="h-5 w-5" />
                <span className="text-sm">Continue with Google</span>
              </motion.button> */}

              {/* <div className="flex flex-col gap-3 mb-6"> */}
              <motion.button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg py-3 shadow-sm hover:bg-gray-100 transition font-semibold cursor-pointer"
                onClick={handleSignInWithGoogle}
                whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={google}
                  alt="Google"
                  className="w-5 h-5 sm:h-4 sm:w-4"
                />
                Continue with Google
              </motion.button>
              {/* </div> */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Register;
