export const copyToClipboard = (clip: string): void => {
  const permissionName = "clipboard-write" as PermissionName;
  navigator.permissions.query({ name: permissionName }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.clipboard.writeText(clip).then(
        () => {},
        () => {
          alert(
            "Activa el permiso de acceder al portapapeles para usar este botón"
          );
        }
      );
    }
  });
};
