const message = window.antd.message;

message.install = (vue) => {
  Object.defineProperties(vue.prototype, {
    $message: {
      get() {
        return message;
      }
    }
  });
};

export default message;
