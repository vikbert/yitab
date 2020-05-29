const filesInDirectory = dir => new Promise (resolve =>
    dir.createReader ().readEntries (entries =>
        Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>
            e.isDirectory
                ? filesInDirectory (e)
                : new Promise (resolve => e.file (resolve))
        ))
        .then (files => [].concat (...files))
        .then (resolve)
    )
)

const timestampForFilesInDirectory = dir =>
        filesInDirectory (dir).then (files =>
            files.filter((file) => file.name === 'options.js').map (f => f.name + f.lastModifiedDate).join ())

const reload = () => {
    chrome.tabs.query ({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
            chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir))
        }
    })
}

const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory (dir).then (timestamp => {

        if (!lastTimestamp || (lastTimestamp === timestamp)) {
            console.log(lastTimestamp)
            setTimeout (() => watchChanges (dir, timestamp), 1000)
        } else {
           reload();
        }
    })
}

chrome.management.getSelf (self => {
    if (self.installType === 'development') {
        chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir))
    }
})
