import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_super_secreta';

export function generarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, email: usuario.email },
    SECRET_KEY,
    { expiresIn: '2h' }
  );
}

export function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
}
