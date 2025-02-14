# gcp

```plain
Usage:
  gcp [options] [<pattern> [<pattern> ...]]

Gcp v0.0.1

Expand the positional glob expression arguments into any matching file system
paths found, then copy to dest dir.

  -d --dot-relative      Prepend './' on relative matches
  -m --mark              Append a / on any directories matched
  -x --posix             Always resolve to posix style paths, using '/' as the
                         directory separator, even on Windows. Drive letter
                         absolute matches on Windows will be expanded to their
                         full resolved UNC maths, eg instead of 'C:\foo\bar', it
                         will expand to '//?/C:/foo/bar'.

  -f --follow            Follow symlinked directories when expanding '**'
  -R --realpath          Call 'fs.realpath' on all of the results. In the case
                         of an entry that cannot be resolved, the entry is
                         omitted. This incurs a slight performance penalty, of
                         course, because of the added system calls.

  -s --stat              Call 'fs.lstat' on all entries, whether required or not
                         to determine if it's a valid match.

  -b --match-base        Perform a basename-only match if the pattern does not
                         contain any slash characters. That is, '*.js' would be
                         treated as equivalent to '**/*.js', matching js files
                         in all directories.

  --dot                  Allow patterns to match files/directories that start
                         with '.', even if the pattern does not start with '.'

  --nobrace              Do not expand {...} patterns
  --nocase               Perform a case-insensitive match. This defaults to
                         'true' on macOS and Windows platforms, and false on all
                         others.

                         Note: 'nocase' should only be explicitly set when it is
                         known that the filesystem's case sensitivity differs
                         from the platform default. If set 'true' on
                         case-insensitive file systems, then the walk may return
                         more or less results than expected.

  --noext                Do not expand extglob patterns, such as '+(a|b)'
  --noglobstar           Do not expand '**' against multiple path portions. Ie,
                         treat it as a normal '*' instead.

  --windows-path-no-escape
                         Use '\' as a path separator *only*, and *never* as an
                         escape character. If set, all '\' characters are
                         replaced with '/' in the pattern.

  -D<n> --max-depth=<n>  Maximum depth to traverse from the current working
                         directory

  -C<cwd> --cwd=<cwd>    Current working directory to execute/match in
  -r<root> --root=<root> A string path resolved against the 'cwd', which is used
                         as the starting point for absolute patterns that start
                         with '/' (but not drive letters or UNC paths on
                         Windows).

                         Note that this *doesn't* necessarily limit the walk to
                         the 'root' directory, and doesn't affect the cwd
                         starting point for non-absolute patterns. A pattern
                         containing '..' will still be able to traverse out of
                         the root directory, if it is not an actual root
                         directory on the filesystem, and any non-absolute
                         patterns will still be matched in the 'cwd'.

                         To start absolute and non-absolute patterns in the same
                         path, you can use '--root=' to set it to the empty
                         string. However, be aware that on Windows systems, a
                         pattern like 'x:/*' or '//host/share/*' will *always*
                         start in the 'x:/' or '//host/share/' directory,
                         regardless of the --root setting.

  --platform=<platform>  Defaults to the value of 'process.platform' if
                         available, or 'linux' if not. Setting --platform=win32
                         on non-Windows systems may cause strange behavior!

                         Valid options: "aix", "android", "darwin", "freebsd",
                         "haiku", "linux", "openbsd", "sunos", "win32",
                         "cygwin", "netbsd"

  -i<ignore> --ignore=<ignore>
                         Glob patterns to ignore
                         Can be set multiple times
  -B<base> --base=<base> remove base to the resulte
                         Can be set multiple times
  -v --debug             Output a huge amount of noisy debug information about
                         patterns as they are parsed and used to match files.

  -h --help              Show this usage information
```
