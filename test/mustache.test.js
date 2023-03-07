import Mustache from "mustache"
import fs from "fs/promises";

test("Menggunakan Mustache", () => {
  const data = Mustache.render("Hello {{name}}", {name: "arifal"});
  expect(data).toBe("Hello arifal");
});

test("Menggunakan Mustache cache", () => {
  Mustache.parse("Hello {{name}}");

  const data = Mustache.render("Hello {{name}}", {name: "arifal"});
  expect(data).toBe("Hello arifal");
});

test("Tags", () => {
  const data = Mustache.render("Hello {{name}}, my hobby is {{{hobby}}}", {
    name: "arifal",
    hobby: "<b>Kerja Keras</b>"
  });
  expect(data).toBe("Hello arifal, my hobby is <b>Kerja Keras</b>");
});

test("Menggunakan Nested Object", () => {
  const data = Mustache.render("Hello {{person.name}}", {
    person: {
      name: "arifal"
    }
  });
  expect(data).toBe("Hello arifal");
});

test("Mustache file", async () => {
  const templatesHello = await fs.readFile("./templates/hello.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesHello, {
    title: "arifal"
  });

  console.info(data);
  expect(data).toContain("arifal");
});

test("Mustache Section Show", async () => {
  const templatesPerson = await fs.readFile("./templates/person.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesPerson, {
    person: {
      name: "arifal"
    }
  });

  console.info(data);
  expect(data).toContain("Hello Person");
});

test("Mustache Section Not Show", async () => {
  const templatesPerson = await fs.readFile("./templates/person.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesPerson, {});

  console.info(data);
  expect(data).not.toContain("Hello Person");
});

test("Mustache Section Data", async () => {
  const templatesPerson = await fs.readFile("./templates/person.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesPerson, {
    person: {
      name: "arifal"
    }
  });

  console.info(data);
  expect(data).toContain("Hello Person arifal");
});

test("Mustache Inverted Section", async () => {
  const templatesPerson = await fs.readFile("./templates/person.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesPerson, {});

  console.info(data);
  expect(data).toContain("Hello Tamu");
});

test("Mustache List Section", async () => {
  const templatesPerson = await fs.readFile("./templates/hobbies.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesPerson, {
    hobbies: ["arifal", "hidayat", "salamulloh"]
  });

  console.info(data);
  expect(data).toContain("arifal");
  expect(data).toContain("hidayat");
  expect(data).toContain("salamulloh");
});

test("Mustache List Object", async () => {
  const templatesPerson = await fs.readFile("./templates/students.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesPerson, {
    students: [
      {name: "arifal", value: 1},
      {name: "hidayat", value: 2},
      {name: "salamulloh", value: 3},
    ]
  });

  console.info(data);
  expect(data).toContain("arifal");
  expect(data).toContain("hidayat");
  expect(data).toContain("salamulloh");
  expect(data).toContain("3");
});

test("Mustache function", async () => {
  const parameter = {
    name: "arifal",
    upcase: () => {
      return (text,render) => {
        return render(text).toUpperCase();
      }
    }
  }

  const data = Mustache.render("Hello {{#upcase}}{{name}}{{/upcase}}", parameter);
  console.info(data);
  expect(data).toContain("Hello ARIFAL");
});

test("Mustache comment", async () => {
  const templatesHello = await fs.readFile("./templates/comment.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesHello, {
    name: "arifal"
  });

  console.info(data);
  expect(data).toContain("arifal");
  expect(data).not.toContain("comment in mustache");
});

test("Mustache Partials", async () => {
  const templatesContent = await fs.readFile("./templates/content.mustache")
  .then(data => data.toString());
  const templatesHeader = await fs.readFile("./templates/header.mustache")
  .then(data => data.toString());
  const templatesFooter = await fs.readFile("./templates/footer.mustache")
  .then(data => data.toString());

  const data = Mustache.render(templatesContent, {
    title: "Belajar Mustache Partials",
    content: "Arifal Hidayat Salamulloh"
  },{
    header: templatesHeader,
    footer: templatesFooter
  });

  console.info(data);
  expect(data).toContain("Belajar Mustache Partials");
  expect(data).toContain("Arifal Hidayat Salamulloh");
  expect(data).toContain("@arifalhidayat");
});