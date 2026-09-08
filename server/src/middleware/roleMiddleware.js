/**
 * Restricts a route to one or more roles. Must run AFTER `protect`,
 * since it relies on req.user being set.
 *
 * Usage: router.post('/', protect, restrictTo('organizer'), createEvent)
 */
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires role: ${allowedRoles.join(' or ')}`,
      });
    }

    next();
  };
};

module.exports = { restrictTo };
