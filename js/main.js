function read() {
    try {
        var input = document.getElementById("input").value;
        input = input.replace(/\n/g,' ');
        var a = input.split(' ');
        var n = parseInt(a[0]);
        var m = parseInt(a[1]);
        if(a.length < 3 * m + 4) {
            var tip = document.getElementById("tip");
            tip.innerText = "Invaild Input";
            tip.style.color = "red";
            return [0, 0, [], 0, 0, []];
        }
        var G = new Array(n + 1);
        for(var i = 0; i <= n; ++i) G[i] = new Array();
        for(var i = 0; i < m; ++i) {
            G[parseInt(a[i * 3 + 2])].push([parseInt(a[i * 3 + 3]),  parseInt(a[i * 3 + 4])]);
            G[parseInt(a[i * 3 + 3])].push([parseInt(a[i * 3 + 2]),  parseInt(a[i * 3 + 4])]);
        }
        var S = parseInt(a[3 * m + 2]);
        var T = parseInt(a[3 * m + 3]);
        var h = new Array();
        if(a.length >= 3 * m + n + 4) {
            for(var i = 3 * m + 4; i < a.length; ++i) {
                h.push(parseInt(a[i]));
            }
        }
        return [n, m, G, S, T, h];
    } catch (error) {
        console.log(error);
        var tip = document.getElementById("tip");
        tip.innerText = "Invaild Input";
        tip.style.color = "red";
        return [0, 0, [], 0, 0, []];
    }
}

function change() {
    var tip = document.getElementById("tip");
    tip.innerText = "(click here to run this program)";
    tip.style.color = "black";
}

function find(array, val) {
    for(var i = 0; i < array.length; ++i) {
        if(array[i] == val) return true;
    }
    return false;
}

function bfs(G, S, T) {
    var que = new Array();
    var vis = new Array();
    que.push([S, 0]);
    vis.push(S);
    var ans = -1;
    var pre = new Array();
    while(que.length) {
        var tmp = que.shift();
        var u = tmp[0];
        var w = tmp[1];
        if(u == T) {
            ans = w;
            break;
        }
        for(var i = 0; i < G[u].length; ++i) {
            if(find(vis, G[u][i][0])) continue;
            vis.push(G[u][i][0]);
            que.push([G[u][i][0], G[u][i][1] + w]);
            pre[G[u][i][0]] = u;
        }
    }
    var path = new Array();
    if(ans != -1) {
        pre[S] = 0;
        var now = T;
        while(now) {
            path.push(now);
            now = pre[now];
        }
    }
    return [ans, path.reverse()];
}

function dfss(G, u, T, vis, w) {
    if(u == T) {
        return w;
    }
    if(find(vis, u)) return 0x3f3f3f3f3f;
    vis.push(u);
    var res = 0x3f3f3f3f3f;
    for(var i = 0; i < G[u].length; ++i) {
        res = Math.min(res, dfss(G, G[u][i][0], T, vis, w + G[u][i][1]));
    }
    vis.pop();
    return res;
}

function find_dfs_path(G, u, T, vis, pre, w, sum) {
    if(u == T) return w == sum;
    if(find(vis, u)) return false;
    vis.push(u);
    for(var i = 0; i < G[u].length; ++i) {
        if(find_dfs_path(G, G[u][i][0], T, vis, pre, w + G[u][i][1], sum)) {
            pre[G[u][i][0]] = u;
            return true;
        }
    }
    vis.pop();
    return false;
}

function dfs(G, S, T) {
    var pre = new Array();
    var res = dfss(G, S, T, new Array(), 0);
    find_dfs_path(G, S, T, new Array(), pre, 0, res);
    var path = new Array();
    if(res >= 0x3f3f3f3f3f) res = -1;
    if(res != -1) {
        pre[S] = 0;
        var now = T;
        while(now) {
            path.push(now);
            now = pre[now];
        }
    }
    return [res, path.reverse()];
}

function Greedy(G, S, T) {
    var now = S;
    var res = 0;
    var vis = new Array();
    vis.push(now);
    while(true) {
        var Min = -1;
        var tag = false;
        if(now == T) break;
        for(var i = 0; i < G[now].length; ++i) {
            if(find(vis, G[now][i][0])) continue;
            tag = true;
            if(Min == -1 || G[now][Min][1] > G[now][i][1]) {
                Min = i;
            }
        }
        if(!tag) break;
        res += G[now][Min][1];
        now = G[now][Min][0];
        vis.push(now);
    }
    if(now != T) {
        res = -1;
        vis = [];
    }
    return [res, vis];
}

function cmp(a, b) {
    return a[0] - b[0];
}

function A(G, S, T, h) {
    var que = new Array();
    var vis = new Array();
    que.push([0, 0, S]);
    var ans = -1;
    var pre = new Array();
    while(que.length) {
        var tmp = que.shift();
        var w = tmp[0];
        var g = tmp[1];
        var u = tmp[2];
        if(u == T) {
            ans = g;
            break;
        }
        if(find(vis, u)) continue;
        vis.push(u);
        for(var i = 0; i < G[u].length; ++i) {
            if(find(vis, G[u][i][0])) continue;
            que.push([G[u][i][1] + g + h[G[u][i][0] - 1], g + G[u][i][1], G[u][i][0]]);
            pre[G[u][i][0]] = u;
        }
        que = que.sort(cmp);
    }
    var path = new Array();
    if(ans != -1) {
        pre[S] = 0;
        var now = T;
        while(now) {
            path.push(now);
            now = pre[now];
        }
    }
    return [ans, path.reverse()];
}

function show(id, res, time) {
    document.getElementById(id + "_sp").innerText = res[0];
    document.getElementById(id + "_rt").innerText = time + "ms";
}

var path_bfs = [];
var path_dfs = [];
var path_ga = [];
var path_A = [];

function show_path(id) {
    var path = "";
    document.getElementById("path").innerText = path;
    if(id == "bfs") {
        if(path_bfs.length < 1) return;
        path += path_bfs[0];
        for(var i = 1; i < path_bfs.length; ++i) {
            path += " -> " + path_bfs[i];
        }
    }
    else if(id == "dfs") {
        if(path_dfs.length < 1) return;
        path += path_dfs[0];
        for(var i = 1; i < path_dfs.length; ++i) {
            path += " -> " + path_dfs[i];
        }
    }
    else if(id == "ga") {
        if(path_ga.length < 1) return;
        path += path_ga[0];
        for(var i = 1; i < path_ga.length; ++i) {
            path += " -> " + path_ga[i];
        }
    }
    else if(id == "aa") {
        if(path_A.length < 1) return;
        path += path_A[0];
        for(var i = 1; i < path_A.length; ++i) {
            path += " -> " + path_A[i];
        }
    }
    document.getElementById("path").innerText = path;
}

function Clear() {
    show('bfs', [0], 0);
    show('dfs', [0], 0);
    show('ga', [0], 0);
    show('aa', [0], 0);
    path_bfs = [];
    path_dfs = [];
    path_ga = [];
    path_A = [];
    document.getElementById("path").innerText = "";
}

function Run () {
    Clear();
    var tmp = read();
    var n = tmp[0];
    var m = tmp[1];
    var G = tmp[2];
    var S = tmp[3];
    var T = tmp[4];
    var h = tmp[5];
    var start = 0;
    var end = 0;

    start = (new Date()).getTime();
    var res_bfs = bfs(G, S, T);
    end = (new Date()).getTime();
    var time_bfs = end - start;
    show('bfs', res_bfs, time_bfs);

    start = (new Date()).getTime();
    var res_dfs = dfs(G, S, T);
    end = (new Date()).getTime();
    var time_dfs = end - start;
    show('dfs', res_dfs, time_dfs);

    start = (new Date()).getTime();
    var res_greedy = Greedy(G, S, T);
    end = (new Date()).getTime();
    var time_greedy = end - start;
    show('ga', res_greedy, time_greedy);

    if(h.length == n) {
        start = (new Date()).getTime();
        var res_A = A(G, S, T, h);
        end = (new Date()).getTime();
        var time_A = end - start;
        show('aa', res_A, time_A);
        path_A = res_A[1];
    }
    else show('aa', [-1], 0);

    path_bfs = res_bfs[1];
    path_dfs = res_dfs[1];
    path_ga = res_greedy[1];
}