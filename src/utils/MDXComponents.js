import Banner from "@/components/Banner";
import ThemesTester from "@/components/ThemesTester";
import TextFactory from "@/components/TextFactory";
import Quiz from "@/components/Quiz";
import CodeSnippet from "@/components/CodeSnippet";

const MDXComponents = {
  Banner,
  ThemesTester,
  TextFactory,
  Quiz,
  pre: CodeSnippet,
};

export default MDXComponents;
