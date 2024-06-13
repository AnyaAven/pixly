
import React from "react";

/** Presentational component for showing bootstrap-style alerts.
 *
 * Props:
 * type: bootstrap types,
 * children: React children
*/
type tAlertProps = {type: string, children: React.ReactNode}

function Alert({ type = "danger", children }: tAlertProps) {
  console.debug("Alert", "type=", type);

  return (
    <div className={`Alert alert alert-${type}`} role="alert">
      {children}
    </div>
  );
}

export default Alert;