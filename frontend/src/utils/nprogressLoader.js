// src/utils/nprogressLoader.js
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import "../nprogressLoader.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 }); // Customize if needed

export const startLoader = () => {
  NProgress.start();
};

export const stopLoader = () => {
  NProgress.done();
};
