import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  imports: [],
  template: `
    <footer>
      <small>
        <span>
          &copy; {{ year }} by
          <a class="secondary" href="{{ author.url }}">{{ author.name }}.</a>
        </span>
        <span>
          <a href="{{ repository }}">Code</a> based on
          <a href="{{ archetype }}">{{ archetypeName }}</a>
        </span>
      </small>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {
  protected author = {
    name: "AlbertoBasalo",
    email: "AlbertoBasalo@AIcode.academy",
    url: "https://albertobasalo.dev",
  };
  protected repository =
    "https://github.com/TrainingITCourses/softtek_angular_spa";
  protected archetype = "https://github.com/AIcodeAcademy/ArchetypeAngularSPA";
  protected archetypeName = "Archetype Angular SPA";
  protected year: number = new Date().getFullYear();
}
