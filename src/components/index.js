export default function (Vue, options) {
    let requireComponent = require.context('./', true, /\.vue$/);
    requireComponent.keys().forEach(fileName => {
        let componentConfig = requireComponent(fileName);
        componentConfig = componentConfig.default || componentConfig;
        let index = fileName.lastIndexOf('/');
        let name = fileName.replace('.vue', '').substring(index + 1);

        let componentName = componentConfig.name || name;

        Vue.component(componentName, componentConfig);
    });
}