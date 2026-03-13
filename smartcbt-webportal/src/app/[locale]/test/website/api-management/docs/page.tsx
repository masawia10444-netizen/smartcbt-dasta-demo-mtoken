"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Index() {
  return (
    <>
      <SwaggerUI url="/swagger.json" />
    </>
  );
}
