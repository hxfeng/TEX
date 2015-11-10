
fancyhdr 宏包
页面样式和页码

LaTeX 提供了 \pagestyle [1] 命令让我们可以文档所有页面的样式 (包括页边距, 页眉和页脚等内容); 同时, 还提供了 \pagenumbering 来设置页码的显示格式. LaTeX 提供了四种不同的页面样式:

    \pagestyle{empty} 设置页面的样式为没有页眉和页脚.
    \pagestyle{plain} 设置页面的样式为没有页眉, 页脚中间是页码.
    \pagestyle{headings} 设置页面的样式为没有页脚, 页眉显章节标题和页码.
    \pagestyle{myheadings} 设置页面的样式为没有页脚, 页眉中显示用户提供的内容.

plain 页面样式是 LaTeX 的默认页面样式.

LaTeX 提供了如下几种页码的显示格式 [2]:

    \pagenumbering{arabic} 设置页面的页码格式为阿拉伯数字.
    \pagenumbering{roman} 设置页面的页码格式为小写罗马数字.
    \pagenumbering{Roman} 设置页面的页码格式为大写罗马数字.
    \pagenumbering{alph} 设置页面的页码格式为小写字母.
    \pagenumbering{Alph} 设置页面的页码格式为大写字母.

尽管 LaTeX 的 \pagestyle 和 \pagenumbering 命令提供了多种标准的定义页眉页脚和页码的方式, 但是它们能够实现的功能还是非常有限. 为了排版更加个性化的页眉页脚, 需要使用 fancyhdr 宏包.
功能介绍

fancyhdr 宏包提供了丰富的页眉页脚排版功能, 包括:

    分别对页眉和页脚的左边, 中间和右边部分进行设置.
    在页眉和页脚中添加装饰线.
    可以设置比正文更宽的页眉和页脚.
    多行的页眉和页脚.
    奇数页和偶数页设置不同的页眉和页脚.
    不同章节设置不同的页眉和页脚.
    在页眉页脚中使用 浮动体.

下面将使用一些示例来说明如何使用 fancyhdr 宏包的各种排版功能.
基本用法

fancyhdr 宏包提供了如下一些命令来设置简单的页眉页脚:

    \lhead 设置页眉左边部分的内容.
    \chead 设置页眉中间部分的内容.
    \rhead 设置页眉右边部分的内容.
    \lfoot 设置页脚左边部分的内容.
    \cfoot 设置页脚中间部分的内容.
    \rfoot 设置页脚右边部分的内容.
    \headrulewidth 页眉分隔线的宽度.
    \footrulewidth 页脚分隔线的宽度.
    \thepage 页面的页码.

下面来看一个使用 fancyhdr 宏包的基础示例.

\documentclass{article}

\usepackage{fancyhdr}
\pagestyle{fancy}

\lhead{}
\chead{}
\rhead{\bfseries The performance of new graduates}
\lfoot{From: K. Grant}
\cfoot{To: Dean A. Smith}
\rfoot{\thepage}
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}

\begin{document}
        Hello Fancyhdr.
\end{document}

排版之后的效果为.

FANCYHDR BASIC

为了使用 fancyhdr 排版个性化的页眉页脚, 需要按照如下几个步骤:

    在文档的 导言区 引入宏包: \usepackage{fancyhdr}.
    使用 \pagestyle{fancy} 命令定义页面的样式为 fancy.
    使用 \lhead, \chead, ... 等命令设置页眉页脚内容.
    \renewcommand{\headrulewidth}{0.4pt} 设置页眉和正文分隔线的宽度为 0.4pt, 如果希望设置更宽的分隔线, 例如: 2pt, 可以使用 \renewcommand{\headrulewidth}{2pt}. 类似的, \renewcommand{\footrulewidth}{0.4pt} 是设置页脚和正文分隔线的宽度.

双面打印页面设置

fancyhdr 宏包提供了 \fancyhead 和 \fancyfoot 命令来排版更加复杂的页眉和页脚, 也可以进行双面打印页面设置.

在排版双面打印的文档时 (书籍, 报告等), 一般情况下奇数页和偶数页的页眉页脚要对应. 也就是:

    奇数页页眉页脚的右边部分的内容和偶数页页眉页脚左边部分的内容对应.
    奇数页页眉页脚的左边部分的内容和偶数页页眉页脚右边部分的内容对应.
    奇数页页眉页脚的中间部分的内容和偶数页页眉页脚中间部分的内容对应.

为了实现这个效果, \fancyhead 和 \fancyfoot 在设置页眉页脚时, 可以使用表示奇数页和偶数页的参数:

    LE 表示偶数页左边部分 (Left Even)
    LO 表示奇数页左边部分 (Left Odd)
    CE 表示偶数页中间部分 (Center Even)
    CO 表示奇数页中间部分 (Center Odd)
    RE 表示偶数页右边部分 (Right Even)
    RO 表示奇数页右边部分 (Right Odd)

上面的参数用在命令 \fancyhead 中时表示设置页眉, 用在命令 \fancyfoot 中时表示设置页脚.

\documentclass[twoside]{report}

\usepackage{fancyhdr}
\pagestyle{fancy}

\fancyhead{} % 清除所有页眉设置
\fancyhead[RO,LE]{\bfseries The performance of new graduates}
\fancyfoot{} % 清除所有的页脚设置
\fancyfoot[LE,RO]{\thepage}
\fancyfoot[LO,CE]{From: K. Grant}
\fancyfoot[CO,RE]{To: Dean A. Smith}
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}

\begin{document}
        Odd Page.

        \newpage

        Even Page.
\end{document}

排版之后的奇数页效果.

FANCYHDR TWO SIDES 0

偶数页效果.

FANCYHDR TWO SIDES 1

从上面的排版效果来看, 奇数页和偶数页的页眉页脚设置是不一样的. 但是, 如果采用双面打印, 那么奇数页和偶数页对应位置的页眉和页脚就是一样的设置了.

通常情况下, \fancyhead, \fancyfoot 命令和 \lhead, \chead, \rhead, \lfoot, \cfoot, \rfoot 并不会一起使用. 当页面为双面打印时, 会使用前面一组命令设置页眉和页脚; 如果页面为单面打印, 会使用后面一组命令设置页眉和页脚.
显示章节标题

在写书或者报告的时候, 通常希望将章节的标题以及编号显示在页眉或者页脚中. 这个时候需要使用到如下几个命令:

    \chaptermark 每次排版章标题的时候都会自动调用这个命令.
    \sectionmark 每次排版节标题的时候都会自动调用这个命令 [3].
    \markboth 用于设置 \leftmark 和 \rightmark 的值.
    \markright 用于设置 \rightmark 的值.

这几个命令的作用机制比较复杂, 我们就用一个示例来说明如果应用他们设置页眉页脚. 我们希望在页眉的左边设置节 (section) 标题.

\documentclass{article}

\usepackage{fancyhdr}
\pagestyle{fancy}

\renewcommand{\sectionmark}[1]{\markboth{\thesection.\ #1}{}}

\lhead{\bfseries \leftmark}
\chead{}
\rhead{}
\lfoot{From: K. Grant}
\cfoot{To: Dean A. Smith}
\rfoot{\thepage}
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}

\begin{document}
        \section{Section Title}
        Hello Fancyhdr
\end{document}

排版之后的效果如下.

FANCYHDR CHAPTER

对上面的代码稍微做一点解释:

    \renewcommand{\sectionmark}[1]{\markboth{\thesection.\ #1}{}} 重新定义了 \sectionmark 这个命令, 也就是当 LaTeX 每次排版节标题时自动调用 \sectionmark 命令的时候实际执行的是重新定义之后的 \markboth{\thesection.\ #1}{}, 这里的参数 #1 就是节标题的文字. \markboth 的作用是将它第一个参数的值设置给 \leftmark 变量, 将第二参数的值设置给 \rightmark 命令.
    \lhead{\bfseries \leftmark} 设置页眉左边的部分的内容时使用了 \leftmark, 它的值就是之前设置的 \thesection.\ #1, 其中 #1 是节标题的文字. 也就是将页眉左边的部分设置为了节编号, 节标题并且使用加粗的样式显示 (\bfseries).

插入图片

有时, 需要在页眉或者页脚中插入图片, 例如: 学校或者公司的 LOGO. fancyhdr 宏包也能很方便地在页眉页脚中排版图片.

\documentclass{article}
\usepackage{graphicx}

\usepackage{fancyhdr}
\pagestyle{fancy}

\lhead{
        \setlength{\unitlength}{1mm}
        \begin{picture}(0,0)
        \put(0,0){\includegraphics[width=1cm]{logo.eps}}
        \end{picture}
}
\chead{}
\rhead{\bfseries The performance of new graduates}
\lfoot{From: K. Grant}
\cfoot{To: Dean A. Smith}
\rfoot{\thepage}
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}

\begin{document}
        Hello Fancyhdr.
\end{document}

排版之后的效果如下.

FANCYHDR LOGO

在这个示例中, \lhead 命令设置页眉左边的部分内容为一个 LOGO. 而排版 LOGO 使用了 picture 环境, 并且使用了 graphicx 宏包 提供的 \includegraphics 命令将 logo.eps 插入到页眉中. 类似地, 使用 \lfoot 可以在页脚左边的部分插入图片等等.
[1]	如果仅仅想设置某一页的页面样式, 可以在那一页上使用 \thispagestyle 命令. \thispagestyle 命令可以使用和 \pagestyle 一样的标准页面样式参数: empty, plain, headings, myheadings.
[2]	在论文写作中, 一般正文部分的内容是采用罗马数字的页码显示格式, 正文部分则采用阿拉伯数字页码显示格式.
[3]	类似的, 还有 \subsectionmark, \paragraphmark, \subparagraphmark 等命令.
