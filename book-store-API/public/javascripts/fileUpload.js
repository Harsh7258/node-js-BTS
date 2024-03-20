FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 130,
    imageResizeTargetWidth: 130,
    imageResizeTargetHeight: 150
})

FilePond.parse(document.body);