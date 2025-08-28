console.log(">>> pb_hooks chargé (top-level)");

onBeforeServe((e) => {
  e.app.logger().info(">>> onBeforeServe OK (JS hooks actifs)");
});
