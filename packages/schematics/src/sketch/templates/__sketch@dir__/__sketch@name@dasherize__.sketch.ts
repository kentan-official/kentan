import { Sketch } from '@kentan-official/core';
<% if (modelImportPath(sketch)) { %>
import { <%= classify(name(sketch)) %> } from '<%= modelImportPath(sketch) %>';
<% } %>
export class For<%= classify(name(sketch)) %> extends Sketch<<%=classify(name(sketch))%>> {
  constructor() {
    super(<% if (isClass(sketch)) { %><%= classify(name(sketch)) %>, <% } %>{});
  }
}
