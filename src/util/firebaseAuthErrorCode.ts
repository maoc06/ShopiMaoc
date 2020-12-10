export default function firebaseAuthErrorCode(code: string): string {
    switch (code) {
        case "auth/email-already-exists":
            return "El email ya existe";
        case "auth/id-token-revoked":
            return "Se revocó el email";
        case "auth/internal-error":
            return "Se produjo un error interno. Vuelve a intentarlo más tarde.";
        case "auth/invalid-credential":
            return "Credenciales invalidas";
        case "auth/invalid-email":
            return "El email no es valido";
        case "auth/invalid-password":
            return "Contrasena invalida";
        case "auth/wrong-password":
            return "Contrasena invalida";
        case "auth/user-not-found":
            return "No se encontro el usuario";
        case "auth/user-disabled":
            return "El usuario esta inhabilitado";
        default:
            return "Se produjo un error desconocido";
    }
}