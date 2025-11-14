/**
 * Interfaz base para los datos del usuario que se reciben en la respuesta.
 * Se usa para tipificar el objeto 'user' en las respuestas de Login, Register y Profile.
 */
export interface User {
    id: number;
    email: string;
    name: string;
    // Solo presente en la respuesta de /profile
    createdAt?: string; 
  }
  
  /**
   * Interfaz para los datos que se envían en el BODY de la petición POST a /api/auth/register.
   */
  export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
  }
  
  /**
   * Interfaz para los datos que se envían en el BODY de la petición POST a /api/auth/login.
   */
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  /**
   * Interfaz para la respuesta exitosa del servidor (Login y Register).
   * El token es crucial para Angular.
   */
  export interface AuthResponse {
    message: string;
    token: string;
    user: User; // Usa la interfaz User definida arriba
  }
  
  /**
   * Interfaz para la respuesta exitosa de la ruta protegida /api/auth/profile.
   * Solo contiene el objeto User (con el campo createdAt opcional).
   */
  export interface ProfileResponse {
    user: User;
  }
  
  /**
   * Interfaz para la respuesta de la ruta protegida /api/protected.
   */
  export interface ProtectedResponse {
    message: string;
    data: string;
  }